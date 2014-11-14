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
          product.reviewAvgHtml = getReviewHtml(reviews);
          $scope.products.push(product);
        });
      });
    });
  });
})

.controller('ProductCtrl', function($scope, $stateParams, Products) {
  Products.get($stateParams.productId).success(function(product){
    Products.getReviews($stateParams.productId).success(function(reviews){
      product.reviewAvgHtml = getReviewHtml(reviews);
      $scope.product = product;
    });
  });
})

.controller('HomeCtrl', function() {
  angular.element(document.querySelector('#barUnreg')).addClass('invisible');
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

function getReviewHtml (reviews) {
  var reviewSum = 0,
      reviewAvg = 0,
      reviewHtml = [];

  reviews.forEach(function(review) {
    reviewSum += review.score;
  });
  reviewAvg = Math.round(reviewSum);

  for (var i = 1; i <= 5; i++) {
    if (i <= reviewAvg)
      reviewHtml.push("ion-ios7-star");
    else
      reviewHtml.push("ion-ios7-star-outline");
  }

  return reviewHtml;
}
