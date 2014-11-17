angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope, $state) {
 $scope.seller = {name: "John Doe"};
 $scope.state = $state;
})


.controller('UserCtrl', function($scope) {
})

.controller('CustomerCtrl', function($scope, Waitlist) {
  Waitlist.current().success(function(user){
    $scope.customer = user;
    console.log($scope.customer);
  });
})

.controller('ProductCtrl', function($scope, Products) {
  Products.all().success(function(data){
    $scope.products = data;
    window.products = $scope.products;
  });
})

.controller('ProductDetailCtrl', function($scope, $stateParams, $state, $ionicSlideBoxDelegate, Products) {
  $scope.backUrl=$state.current.backUrl;
  Products.get($stateParams.productId).success(function(product){
    Products.getReviews($stateParams.productId).success(function(reviews) {
      product.reviewAvg = getReviewAvg(reviews);
      product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
      Products.getFaq($stateParams.productId).success(function(faq) {
        product.faq = faq;
        $scope.product = product;
      });
    });
  });
  $scope.updateSlider = function () {
    angular.element(document.querySelector('#backButton')).removeClass('ng-hide');
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

.controller('TagCtrl', function($scope, Tags) {
    $scope.tags = Tags.all();
})

.controller('WaitlistCtrl', function($scope, Waitlist) {
  $scope.waitingNumber  = "";
  Waitlist.getSize().success(function(data){
    $scope.waitingNumber  = data.size;
  });
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

  Products.all().success(function(data){
    $scope.products = data;
  });
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
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
