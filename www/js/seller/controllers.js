angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope) {
 $scope.seller = {name: "John Doe"}; 
})

.controller('UserCtrl', function($scope) {
})

.controller('ProductCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  $scope.products = [
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"}
  ];
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
  $scope.product = {name:"Product test", description:"bla bla bla bla bla bla bla bla bla"};
})

.controller('TagCtrl', function($scope) {
    $scope.tags = [
    {name:"Tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag"}
  ];
})

.controller('WaitListCtrl', function($scope) {
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

