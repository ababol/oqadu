angular.module('starter.controllers', [])

.controller('QuestionCtrl', function($scope, $stateParams, Questions, Answers) {
  angular.element(document.querySelector('#barUnreg')).removeClass('invisible');
  $scope.question = [];
  $scope.answers = [];
  Questions.get($stateParams.questionId).success(function(data){
    $scope.question = data;
  });
  Answers.get($stateParams.questionId).success(function(data){
    $scope.answers = data;
  });
})

.controller('RecommendationCtrl', function($scope, $stateParams, Recommendations, Products) {
  $scope.products = [];
  Recommendations.get($stateParams.answerId).success(function(recos){
    // Not really proud of that, callback hell :(, maybe implement with promise in the future
    recos.forEach(function (reco){
      Products.get(reco.productId).success(function(product){
        Products.getReviews(reco.productId).success(function(reviews){
          product.reviewAvg = getReviewAvg(reviews);
          product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
          $scope.products.push(product);
        });
      });
    });
  });
})

.controller('ProductCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, Products) {
  Products.get($stateParams.productId).success(function(product){
    Products.getReviews($stateParams.productId).success(function(reviews) {
      product.reviewAvg = getReviewAvg(reviews);
      product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
      $scope.product = product;
    });
  });

  $scope.updateSlider = function () {
    return $ionicSlideBoxDelegate.update();
  };
})

.controller('HomeCtrl', function($ionicViewService) {
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
  $scope.registerQueue = function () {
    angular.element(document.querySelector('#barReg')).removeClass('invisible');
    angular.element(document.querySelector('#barUnreg')).addClass('invisible');
  };
  $scope.unregisterQueue = function () {
    angular.element(document.querySelector('#barUnreg')).removeClass('invisible');
    angular.element(document.querySelector('#barReg')).addClass('invisible');
  };
});

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
