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
    tags: ""
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

.controller('QuestionCtrl', function($scope, $q, $stateParams, Questions) {
  $scope.question = [];
  $scope.answers = [];

  if ($stateParams.tags) {
    if ($scope.user.tags) {
      $scope.user.tags += "," + $stateParams.tags;
    } else {
      $scope.user.tags = $stateParams.tags;
    }
  }

  loader($scope, $q.when(
    Questions.get($scope.user.tags)
  ).then(function(question) {
    $scope.question = question.data;
  }));

  $scope.selectAnswer = function(data) {
    if ($scope.question._id == "545f70d9946ea453ece17e7e") {
      $scope.acceptRegistering();
      $scope.connectToFirebaseQueue(data.text)
    }
    $scope.user.qa[$scope.question._id] = {
      question: $scope.question,
      answer: data
    };
    if ($scope.user.waiting) {
      var index = $scope.syncQueue.$indexFor($scope.getUserKey());
      if (!$scope.syncQueue[index].qa) {
        $scope.syncQueue[index].qa = {};
      }
      $scope.syncQueue[index].qa[$scope.question._id] = {
        question: $scope.question,
        answer: data
      };
      $scope.syncQueue.$save(index).then(function(){console.log("updated");});
    }
  };
})

.controller('RecommendationCtrl', function($scope, $q, $stateParams, utils, Recommendations, Products) {
  $scope.products = [];

  loader($scope, $q.when(
    Recommendations.get($stateParams.recoId)
  ).then(function(reco) {
    var deferred = $q.defer();

    [].concat(reco.data.products).forEach(function(productId, key) {
      $q.all([
        Products.get(productId),
        Products.getReviews(productId)
      ]).then(function(data) {
        product = data[0].data;

        product.reviewAvg = utils.getReviewAvg(data[1].data);
        product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
        product.reviews = data[1].data;

        $scope.products.push(product);
        $scope.user.products[product._id] = product;

        if ($scope.user.waiting) {
          var index = $scope.syncQueue.$indexFor($scope.getUserKey());
          if (!$scope.syncQueue[index].products) {
            $scope.syncQueue[index].products = {};
          }
          $scope.syncQueue[index].products[product._id] = product;
          $scope.syncQueue.$save(index).then(function() {console.log("updated");});
        }

        // Si on a parcouru tout le tableau de produit, on peut valider la promesse
        if (key === reco.data.products.length - 1) {
          return deferred.resolve();
        }
      });
    });

    return deferred.promise;
  }));
})

.controller('ProductCtrl', function($scope, $rootScope, $q, $stateParams, utils, $ionicNavBarDelegate, $ionicSlideBoxDelegate, Products) {
  $scope.showBackButton = $rootScope.showBackButton;
  $scope.product = [];

  loader($scope, $q.all([
    Products.get($stateParams.productId),
    Products.getReviews($stateParams.productId),
    Products.getFaq($stateParams.productId)
  ]).then(function(data) {
    product = data[0].data;

    product.reviewAvg = utils.getReviewAvg(data[1].data);
    product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
    product.reviews = data[1].data;
    product.faq = data[2].data;

    $scope.product = product;
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

.controller('HomeCtrl', function($scope, $ionicViewService) {
  $scope.hideFooter();
  $scope.hideLoader(true);
  $ionicViewService.clearHistory();
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
      $q.all([
        Products.get(productId),
        Products.getReviews(productId)
      ]).then(function(data) {
        product = data[0].data;

        product.reviewAvg = utils.getReviewAvg(data[1].data);
        product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
        product.reviews = data[1].data;

        $scope.products.push(product);

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

.controller('ScanCtrl', function($scope, $location, $cordovaBarcodeScanner) {
  $cordovaBarcodeScanner.scan().then(function(imageData) {
    alert(imageData.text);
    console.log("Barcode Format -> " + imageData.format);
    console.log("Cancelled -> " + imageData.cancelled);
    $location.path("#/product/" + imageData.text);
  }, function(error) {
    console.log("An error happened -> " + error);
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
