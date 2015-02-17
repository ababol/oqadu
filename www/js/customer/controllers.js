angular.module('starter.controllers', ['Helper', 'firebase'])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})
.controller('MainCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, $ionicLoading, $ionicScrollDelegate, $firebase) {
  $scope.showLoader = function() {
    $scope.errorTxt = false;
    $scope.loaded = false;
    $ionicLoading.show();
  };
  $scope.hideLoader = function(loaded) {
    $scope.loaded = loaded;
    $ionicLoading.hide();
  };
  $scope.showFooter = function() {
    $scope.hideFoot = false;
  };
  $scope.hideFooter = function() {
    $scope.hideFoot = true;
  };
  $scope.refreshScroll = function() {
    $ionicScrollDelegate.resize();
  };
  $scope.error = function(err) {
    $scope.hideFoot = true;
    $scope.errorTxt = "API ERROR " + err.status + " - " + err.data;
  };
  $scope.setUserKey = function(key) {
    $scope.userKey = key;
  };
  $scope.getUserKey = function() {
    return $scope.userKey || null;
  };
  $scope.getUser = function() {
    return $scope.user;
  };
  $scope.updateSlider = function() {
    return $ionicSlideBoxDelegate.update();
  };

  $scope.user = {
    qa: {},
    products: [],
    cart: [],
    waiting: false,
    tags: {},
    actual: {
      tags: [],
      qId: []
    }
  };

  $rootScope.registered = false;

  //Firebase
  $scope.connectedQueue = null;
  $scope.connectToFirebaseQueue = function(queue) {
    var ref = new Firebase("https://oqadu.firebaseio.com/" + queue + "/queue"),
      sync = $firebase(ref);

    $scope.syncQueue = sync.$asArray();
    $scope.connectedQueue = queue;
    console.log("https://oqadu.firebaseio.com/" + queue + "/queue");
    return $scope.syncQueue;
  };
  var ref = new Firebase("https://oqadu.firebaseio.com/queue"),
    sync = $firebase(ref);
  $scope.syncQueue = sync.$asArray();
})

.controller('QuestionCtrl', function($scope, $rootScope, $q, $location, Questions) {
  $scope.question = {};

  loader($scope, $q.when(
    Questions.post($scope.user.actual.tags, $scope.user.actual.qId)
  ).then(function(question) {
    var data = question.data;
    if (data === "Not any remaining questions.") {
      return $location.path("recommendation");
    } else {
      $scope.question = question.data;
    }
  }));

  $scope.selectAnswer = function(data) {
    if ($scope.user.actualShelf == null) {
      if (window.plugins && window.plugins.toast) {
        window.plugins.toast.showLongBottom('Vous pouvez dès à présent vous insrire à la file d\'attente auprès du conseiller "' + data.tags[0] + '"');
      }
      if(!$rootScope.registered)
        $scope.connectToFirebaseQueue(data.tags[0]);
      $scope.showFooter();
      $scope.user.actualShelf = data.tags[0];
      $scope.user.actual = {
        tags: [],
        qId: []
      };
      $scope.user.tags[data.tags[0]]  = [];
    }
    $scope.user.qa[$scope.question._id] = {
      question: $scope.question,
      answer: data
    };
    $scope.user.tags[$scope.user.actualShelf] = $scope.user.tags[$scope.user.actualShelf].concat(data.tags);
    $scope.user.actual.tags = $scope.user.actual.tags.concat(data.tags);
    $scope.user.actual.qId.push($scope.question._id);
    if ($scope.user.waiting) {
      var index = $scope.syncQueue.$indexFor($scope.getUserKey());
      if (!$scope.syncQueue[index].qa) {
        $scope.syncQueue[index].qa = {};
      }
      $scope.syncQueue[index].qa[$scope.question._id] = {
        question: $scope.question,
        answer: data
      };
      $scope.syncQueue[index].tags = $scope.user.tags;
      $scope.syncQueue.$save(index).then(function(){console.log("updated");});
    }
    console.log($scope.user);
  };
})

.controller('RecommendationCtrl', function($scope, $q, $stateParams, utils, Recommendations, Products) {
  $scope.products = [];
  $scope.title = "Recommandation";

  loader($scope, $q.when(
    Recommendations.post($scope.user.actual.tags)
  ).then(function(recos) {
    $scope.products = recos.data;
    if(!$scope.user.products)
      $scope.user.products = [];
    $scope.user.products = $scope.user.products.concat(recos.data);
    if($scope.user.waiting){
      var index = $scope.syncQueue.$indexFor($scope.getUserKey());
      $scope.syncQueue[index].products = $scope.user.products;
      $scope.syncQueue.$save(index).then(function() {console.log("updated");});
    }

    // product.reviewAvg = utils.getReviewAvg(data[1].data);
    // product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
    // product.reviews = data[1].data;
    // if ($scope.user.waiting) {
    //   var index = $scope.syncQueue.$indexFor($scope.getUserKey());
    //   if (!$scope.syncQueue[index].products) {
    //     $scope.syncQueue[index].products = {};
    //   }
    //   $scope.syncQueue[index].products[product._id] = product;
    //   $scope.syncQueue.$save(index).then(function() {console.log("updated");});
    // }
  }));
})

.controller('ProductCtrl', function($scope, $rootScope, $q, $stateParams, utils, Products) {
  $scope.showBackButton = $rootScope.showBackButton;
  $scope.product = {};

  loader($scope, $q.when(
    Products.get($stateParams.productId)
  ).then(function(product) {
    $scope.product = product.data;
  }));

  $scope.addToCart = function(id) {
    var index = $scope.getInTheCart(id);
    console.log(index);
    if (index > -1) {
      $scope.user.cart.splice(index, 1);
    } else {
      $scope.user.cart.push(id);
    }
  };

  $scope.getInTheCart = function(id) {
    return $scope.user.cart.indexOf(id);
  };
})

.controller('HomeCtrl', function($scope, $rootScope, $ionicViewService, Products) {
  $scope.user.actual = {
    tags: [],
    qId: []
  };
  if (!$scope.user.actualShelf || !$rootScope.registered) {
    $scope.hideFooter();
    $scope.hideLoader(true);
    $ionicViewService.clearHistory();
  }
  $scope.user.actualShelf = null;
})

.controller('LoadingCtrl', function($state) {
  angular.element(document.querySelector('#loading')).removeClass('hide');
  var logo = Snap.select("#logo"),
    leroy = logo.select("#leroy"),
    merlin = logo.select("#merlin"),
    triangle = logo.select("#triangle"),
    TIME_ANIM = 500;

  leroy.animate({
     transform: "t0,0s1,1,0,0"
  }, TIME_ANIM);

  merlin.animate({
     transform: "t0,0S1,1,0,0"
  }, TIME_ANIM);

  setTimeout(function() {
    angular.element(document.querySelector('#loading')).addClass('fadeNone');
  }, 2000);


  setTimeout(function() {
    angular.element(document.querySelector('#loading')).addClass('hide');
  }, 2500);

  setTimeout(function() {
    $state.transitionTo("home");
  }, 200);

  triangle.animate({opacity:1,transform:"s1,1"}, 2000, mina.elastic);
})

.controller('BarCtrl', function($scope, $rootScope, $location) {
  $rootScope.registered = false;
  $scope.waitlistPosition = "";
  $scope.waitTime = -1;
  $scope.registerQueue = function() {
    if (!$scope.user.waiting) {
      $scope.user.waiting = true;
      if (window.plugins && window.plugins.toast) {
        window.plugins.toast.showShortBottom('Inscription "' + $scope.connectedQueue + '"');
      }
      $scope.syncQueue.$add($scope.user).then(function(userRef){
        $scope.setUserKey(userRef.key());
        $scope.waitlistPosition = transformPositionToString($scope.syncQueue.length - 1);
        $scope.waitTime = ($scope.syncQueue.length - 1) * 3;
        $rootScope.registered = true;
      });
      $scope.syncQueue.$watch(function(e){
        $scope.waitlistPosition = transformPositionToString($scope.syncQueue.length - 1);
        $scope.waitTime = ($scope.syncQueue.length - 1) * 3;
      });
    }
  };
  $scope.unregisterQueue = function() {
    if ($scope.user.waiting) {
      $scope.user.waiting = false;
      $scope.syncQueue.$remove($scope.syncQueue.$indexFor($scope.getUserKey())).then(function(userRef){
        if (window.plugins && window.plugins.toast) {
          window.plugins.toast.showShortBottom("Désinscription effectuée");
        }
        $rootScope.registered = false;
        if ($location.path() === "/home") {
          $scope.hideFooter();
        }
        console.log("remove from waitlist");
      });
    }
  };
})

.controller('CartCtrl', function($scope, $q, utils, Products) {
  var cart = $scope.user.cart,
    promise = $q.when();

  $scope.products = [];
  $scope.title = "Panier";

  function callback() {
    var deferred = $q.defer();

    if (cart.length === 0) {
      return deferred.resolve();
    }

    cart.forEach(function(productId, key) {
      $q.when(
        Products.get(productId)
      ).then(function(product) {

        // product.reviewAvg = utils.getReviewAvg(data[1].data);
        // product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
        // product.reviews = data[1].data;

        $scope.products.push(product.data);

        // Si on a parcouru tout le tableau de produit, on peut valider la promesse
        if (key === cart.length - 1) {
          return deferred.resolve();
        }
      });
    });

    return deferred.promise;
  }

  loader($scope, $q.when(callback));
})

.controller('ScanCtrl', function($scope, $q, $location, $cordovaBarcodeScanner, $ionicPopup, Products) {
  $cordovaBarcodeScanner.scan()
    .then(function(imageData) {
      Products.getProductId(imageData.text)
        .then(function(id) {
          $location.path("product/" + JSON.parse(id.data));
        })
        .catch(function(err) {
          $ionicPopup.alert({
            title: "Erreur " + err.status,
            template: err.data
          })
          .then(function() {
            $location.path("home");
          });
        });
    });
});

function loader($scope, callback) {
  $scope.showLoader();

  callback
  .catch($scope.error)
  .finally(function() {
    if (window.location.hash.indexOf("product") > -1) {
      setTimeout(function() {
        $scope.hideLoader(false);
        setTimeout(function() {
          $scope.hideLoader(true);
          $scope.updateSlider();
        }, 300);
      }, 400);
    } else {
      $scope.hideLoader(true);
    }
  });
}

function transformPositionToString(position){
  var lastNumber = (""+position).slice(-1);
  var extension;
  switch(lastNumber){
    case "1":
      extension = "st";
      break;
    case "2":
      extension = "nd";
      break;
    case "3":
      extension = "rd";
      break;
    default:
      extension ="th";
      break;
  }
  return position + extension;
}
