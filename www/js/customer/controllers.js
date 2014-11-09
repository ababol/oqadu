angular.module('starter.controllers', [])

.controller('QuestionCtrl', function($scope, $stateParams, Questions, Answers) {
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
        $scope.products.push(product);
      });
    });
  });
})

.controller('ProductCtrl', function($scope) {
});
