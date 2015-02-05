angular.module('starter.controllers', [])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})
.controller('MainCtrl', function ($scope, $ionicLoading, $firebase) {
  $scope.show = function() {
    $scope.errorTxt = false;
    $scope.loaded = false;
    $ionicLoading.show();
  };
  $scope.hide = function(){
    $scope.loaded = true;
    $ionicLoading.hide();
  };
  $scope.error = function(msg, status) {
    $scope.errorTxt = "API ERROR " + status + " - " + msg;
  };
  $scope.user = {
    qa: {},
    products: {},
    waiting: false
  };

  //I don't understand why it doesn't work with the userKey stored in the $scope...
  window.userKey = null;

  //Firebase
  $scope.connectedQueue = null;
  $scope.connectToFirebaseQueue = function(queue){
    var ref = new Firebase("https://oqadu.firebaseio.com/"+queue+"/queue");
    var sync = $firebase(ref);
    $scope.syncQueue = sync.$asArray();
    $scope.connectedQueue = queue;
    console.log("https://oqadu.firebaseio.com/"+queue+"/queue");
    return $scope.syncQueue;
  }
  var ref = new Firebase("https://oqadu.firebaseio.com/queue");
  var sync = $firebase(ref);
  $scope.syncQueue = sync.$asArray();


})

.controller('QuestionCtrl', function($scope, $stateParams, Questions, Answers) {
  angular.element(document.querySelector('#barUnreg')).removeClass('invisible');
  $scope.question = [];
  $scope.answers = [];

  var getQuestions = Questions.get($stateParams.questionId),
      processQuestions = function(question){
        $scope.question = question;
        Answers.get($stateParams.questionId).success(function(answers){
          $scope.answers = answers;
        });
      };


  loader($scope, getQuestions, processQuestions);

  $scope.selectAnswer = function(data){
    if($scope.question._id == "545f70d9946ea453ece17e7e"){
      $scope.connectToFirebaseQueue(data.text)
    }
    $scope.user.qa[$scope.question._id] = {
      question: $scope.question,
      answer: data
    };
    if($scope.user.waiting){
      var index = $scope.syncQueue.$indexFor(window.userKey);
      if(!$scope.syncQueue[index].qa)
        $scope.syncQueue[index].qa = {};
      $scope.syncQueue[index].qa[$scope.question._id] = {
        question: $scope.question,
        answer: data
      };
      $scope.syncQueue.$save(index).then(function(){console.log("updated");});
    }
  };
})

.controller('RecommendationCtrl', function($scope, $stateParams, Recommendations, Products) {
  $scope.products = [];
  window.lastAnswer = $stateParams.recoId;
  console.log($stateParams);

  var getReco = Recommendations.get($stateParams.recoId),
      processReco = function(reco){
        // Not really proud of that, callback hell :(, maybe implement with promise in the future
        [].concat(reco.products).forEach(function (productId){
          Products.get(productId).success(function(product){
            Products.getReviews(productId).success(function(reviews){
              product.reviewAvg = getReviewAvg(reviews);
              product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
              $scope.products.push(product);
              $scope.user.products[product._id] = product;
              if($scope.user.waiting){
                var index = $scope.syncQueue.$indexFor(window.userKey);
                if(!$scope.syncQueue[index].products)
                  $scope.syncQueue[index].products = {};
                $scope.syncQueue[index].products[product._id] = product;
                $scope.syncQueue.$save(index).then(function(){console.log("updated");});
              }
            });
          });
        });
      };

  loader($scope, getReco, processReco);
})

.controller('ProductCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, Products) {
  $scope.lastAnswer = window.lastAnswer || 0;
  var getProducts = Products.get($stateParams.productId),
      processProducts = function(product) {
        Products.getReviews($stateParams.productId).success(function(reviews) {
          product.reviewAvg = getReviewAvg(reviews);
          product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
          product.reviews = reviews;
          Products.getFaq($stateParams.productId).success(function(faq) {
            product.faq = faq;
            $scope.product = product;
          });
        });
      };

  loader($scope, getProducts, processProducts);

  $scope.updateSlider = function () {
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
  var logo = Snap.select("#logo");

  var leroy = logo.select("#leroy"),
    	merlin = logo.select("#merlin"),
      triangle = logo.select("#triangle"),
    	TIME_ANIM = 500;

  leroy.animate({
  	// transform: "t0,1,r0"
     transform: "t0,0s1,1,0,0"
  }, TIME_ANIM);

  merlin.animate({
  	// transform: "t0,1,r0"
    // transform: "t0,-200,r180"
     transform: "t0,0S1,1,0,0"
  }, TIME_ANIM);

  setTimeout(function(){
    angular.element(document.querySelector('#loading')).addClass('fadeNone');
  }, 2000);


  setTimeout(function(){
    angular.element(document.querySelector('#loading')).addClass('hide');
  }, 2500);

  setTimeout(function(){
    $state.transitionTo("home");
    // window.location.href = "customer.html#/home";
  }, 200);

  triangle.animate({opacity:1,transform:"s1,1"}, 2000, mina.elastic);
})

.controller('BarCtrl', function($scope) {
  $scope.registred = false;
  $scope.registerQueue = function () {
    if(!$scope.user.waiting){
      $scope.user.waiting = true;
      $scope.syncQueue.$add($scope.user).then(function(userRef){
        window.userKey = userRef.key();
        console.log("added to waitlist");
        $scope.registred = true;
      });
    }
  };
  $scope.unregisterQueue = function () {
    if($scope.user.waiting){
      $scope.user.waiting = false;
      $scope.syncQueue.$remove($scope.syncQueue.$indexFor(window.userKey)).then(function(userRef){
        $scope.registred = false;
        console.log("remove from waitlist");
      });
    }
  };
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

function loader($scope, get, process) {
  $scope.show();

  get.success(process)
  .error($scope.error)
  .finally(function() {
    if(window.location.hash.indexOf('product') > -1) {
      setTimeout(function(){
        $scope.hide();
        $scope.updateSlider();
      }, 1000);
    } else {
      $scope.hide();
    }
  });
}

function getReviewAvg(reviews) {
  if (reviews.length === 0)
    return "N/A";
  var reviewSum = 0;
  reviews.forEach(function(review) {
    reviewSum += review.score;
  });
  return Math.round(reviewSum);
}

function getReviewHtml (reviewAvg) {
  if (reviewAvg === "N/A")
    return [];
  var reviewHtml = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= reviewAvg)
      reviewHtml.push("ion-ios7-star");
    else
      reviewHtml.push("ion-ios7-star-outline");
  }
  return reviewHtml;
}
