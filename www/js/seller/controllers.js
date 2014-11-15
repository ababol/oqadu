angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope, $state) {
 $scope.seller = {name: "John Doe"};
 $scope.state = $state;
})

.controller('UserCtrl', function($scope) {
})

.controller('ProductCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.get($stateParams.productId);
})

.controller('TagCtrl', function($scope, Tags) {
    $scope.tags = Tags.all();
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

.controller('AllProductsCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

