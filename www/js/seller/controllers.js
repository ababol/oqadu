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

.controller('WaitlistCtrl', function($scope) {
  $scope.waitingNumber  = 3;
  $scope.peopleToday  = 18;
  $scope.chartConfig = {
      options: {
        chart: {
          type: 'areaspline',
          zoomType: 'y',
          height: 200
        }
      },
      series: [{
          data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
      },
      {
        data: [5,2,2,3,5,9,7,14,11],
        type: "column"
      },
      {
          data: [7, 1, 1, 10, 19, 15, 12, 8, 15, 14],
          type: "line"
      }],
      
      title: {
          text: '',
          style: {
              display: 'none'
          }
      },
      subtitle: {
          text: '',
          style: {
              display: 'none'
          }
      },
      legend:{
        enabled: false
      },

      loading: false
  };
})

.controller('AllProductsCtrl', function($scope) {
  $scope.products = [
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product cyril", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product eric2", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product eric", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product eric23", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
    {name:"Product", description:"bla bla bla bla bla bla bla bla bla"}
  ];
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

