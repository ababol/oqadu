angular.module('starter.controllers', ['Helper', 'firebase'])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})
.controller('MainCtrl', function($scope, $rootScope, $ionicLoading, $ionicScrollDelegate, $firebase) {
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

  $scope.user = {
    qa: {},
    products: [],
    cart: [],
    waiting: false,
    tags: []
  };

  $scope.acceptRegistering = function(){
    $scope.showFooter();
  }

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

.controller('QuestionCtrl', function($scope, $q, $location, $stateParams, Questions) {
  $scope.question = {};
  if ($stateParams.tags === undefined) {
    $stateParams.tags = "";
  }

  $scope.user.tags = $stateParams.tags;

  loader($scope, $q.when(
    Questions.get($stateParams.tags)
  ).then(function(question) {
    var data = question.data;
    if (data === "Not any remaining questions.") {
      return $location.path("recommendation/" + $stateParams.tags);
    } else {
      $scope.question = question.data;
    }
  }));

  $scope.selectAnswer = function(data) {
    console.log(data);
    if ($scope.user.tags.length == 0 && data.tags.length > 0) {
      $scope.acceptRegistering();
      $scope.connectToFirebaseQueue(data.tags[0]);
    }
    $scope.user.qa[$scope.question._id] = {
      question: $scope.question,
      answer: data
    };
    $scope.user.tags = $scope.user.tags.concat(data.tags); 
    if ($scope.user.waiting) {
      var index = $scope.syncQueue.$indexFor($scope.getUserKey());
      if (!$scope.syncQueue[index].qa) {
        $scope.syncQueue[index].qa = {};
      }
      $scope.syncQueue[index].qa[$scope.question._id] = {
        question: $scope.question,
        answer: data
      };
      $scope.syncQueue[index].tags = $scope.syncQueue[index].tags.concat(data.tags)
      $scope.syncQueue.$save(index).then(function(){console.log("updated");});
    }
  };
})

.controller('RecommendationCtrl', function($scope, $q, $stateParams, utils, Recommendations, Products) {
  $scope.products = [];

  loader($scope, $q.when(
    Recommendations.get($stateParams.tags)
  ).then(function(recos) {
    $scope.products = recos.data;

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

.controller('ProductCtrl', function($scope, $rootScope, $q, $stateParams, utils, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Products) {
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

  $scope.updateSlider = function() {
    return $ionicSlideBoxDelegate.update();
  };
})

.controller('HomeCtrl', function($scope, $ionicViewService, Products) {
  $scope.user.tags = "";
  $scope.hideFooter();
  $scope.hideLoader(true);
  $ionicViewService.clearHistory();

  Products.getPromo().then(function (products) {
    // products.forEach()
    console.log(products);
  });
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

.controller('BarCtrl', function($scope) {
  $scope.registred = false;
  $scope.waitlistPosition = "";
  $scope.waitTime = -1;
  $scope.registerQueue = function() {
    if (!$scope.user.waiting) {
      $scope.user.waiting = true;
      $scope.syncQueue.$add($scope.user).then(function(userRef){
        $scope.setUserKey(userRef.key());
        $scope.waitlistPosition = transformPositionToString($scope.syncQueue.length - 1);
        $scope.waitTime = ($scope.syncQueue.length - 1) * 3;
        $scope.registred = true;
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
        $scope.registred = false;
        console.log("remove from waitlist");
      });
    }
  };
})

.controller('CartCtrl', function($scope, $q, utils, Products) {
  var cart = $scope.user.cart,
    promise = $q.when();

  $scope.products = [];
  $scope.noProduct = null;

  function callback() {
    var deferred = $q.defer();

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

  if (cart.length === 0) {
    $scope.noProduct = "Pas de produits!";
  } else {
    promise = callback();
  }

  loader($scope, promise);
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
