angular.module('starter.controllers', [])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})
.controller('MainCtrl', function($scope, $ionicLoading, $firebase) {
  $scope.show = function() {
    $scope.errorTxt = false;
    $scope.loaded = false;
    $ionicLoading.show();
  };
  $scope.hide = function() {
    $scope.loaded = true;
    $ionicLoading.hide();
  };
  $scope.hideLoading = function() {
    $ionicLoading.hide();
  };
  $scope.error = function(err) {
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
    waiting: false
  };

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

.controller('QuestionCtrl', function($scope, $q, $stateParams, Questions, Answers) {
  angular.element(document.querySelector('#barUnreg')).removeClass('invisible');
  $scope.question = [];
  $scope.answers = [];

  loader($scope, $q.all([
    Questions.get($stateParams.questionId),
    Answers.get($stateParams.questionId)
  ]).then(function(data) {
    $scope.question = data[0].data;
    $scope.answers = data[1].data;
  }));

  $scope.selectAnswer = function(data) {
    if ($scope.question._id == "545f70d9946ea453ece17e7e") {
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

.controller('RecommendationCtrl', function($scope, $q, $stateParams, Recommendations, Products) {
  $scope.products = [];
  $scope.title = "Recommantion";
  window.lastAnswer = $stateParams.recoId;

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

        product.reviewAvg = getReviewAvg(data[1].data);
        product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
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

.controller('ProductCtrl', function($scope, $q, $stateParams, $ionicSlideBoxDelegate, Products) {
  $scope.lastAnswer = window.lastAnswer || 0;
  $scope.product = [];

  loader($scope, $q.all([
    Products.get($stateParams.productId),
    Products.getReviews($stateParams.productId),
    Products.getFaq($stateParams.productId)
  ]).then(function(data) {
    product = data[0].data;

    product.reviewAvg = getReviewAvg(data[1].data);
    product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
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
    angular.element(document.querySelector('#backButton')).removeClass('ng-hide');
    // $scope.height = angular.element(document.querySelector('#leftCol'))[0].offsetHeight;
    return $ionicSlideBoxDelegate.update();
  };
})

.directive('slideToggle', function () {
  return {
    restrict: 'C',
    link: function (scope, element, attr) {
      element.bind('click', function () {
        element.parent().next().toggleClass('noShow');
      });
    }
  };
})

.controller('HomeCtrl', function($scope, $ionicViewService) {
  $scope.hide();
  angular.element(document.querySelector('#barUnreg')).addClass('invisible');
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
  $scope.registerQueue = function() {
    if (!$scope.user.waiting) {
      $scope.user.waiting = true;
      $scope.syncQueue.$add($scope.user).then(function(userRef){
        $scope.setUserKey(userRef.key());
        console.log("added to waitlist");
        $scope.registred = true;
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

.controller('CartCtrl', function($scope, $q, Products) {
  var cart = $scope.user.cart,
    promise = $q.when();

  $scope.title = "Panier";
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

        product.reviewAvg = getReviewAvg(data[1].data);
        product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
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
  $scope.show();

  callback
  .catch($scope.error)
  .finally(function() {
    if (window.location.hash.indexOf("product") > -1) {
      setTimeout(function() {
        $scope.hideLoading();
        setTimeout(function() {
          $scope.hide();
          $scope.updateSlider();
        }, 300);
      }, 400);
    } else {
      $scope.hide();
    }
  });
}

function getReviewAvg(reviews) {
  if (reviews.length === 0) {
    return "N/A";
  }

  var reviewSum = 0;
  reviews.forEach(function(review) {
    reviewSum += review.score;
  });
  return Math.round(reviewSum);
}

function getReviewHtml (reviewAvg) {
  if (reviewAvg === "N/A") {
    return [];
  }

  var reviewHtml = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= reviewAvg) {
      reviewHtml.push("ion-ios7-star");
    } else {
      reviewHtml.push("ion-ios7-star-outline");
    }
  }
  return reviewHtml;
}
