angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope, $state, $firebase, Sellers) {
  $scope.seller = {id:1, name: "John Doe", shelf: "Peinture"};
  $scope.state = $state;
  $scope.syncQueue = [];
  $scope.customer = {};
  $scope.currentID = null;

  $scope.initSeller = function(id){
    $scope.currentID = null;
    $scope.seller = Sellers.get(id);
    var ref = new Firebase("https://oqadu.firebaseio.com/"+$scope.seller.shelf+"/queue");
    var sync = $firebase(ref);
    $scope.syncQueue = sync.$asArray();
    $scope.syncQueue.$loaded(function(){
      $scope.changeCustomer(0);
    });
    $scope.syncQueue.$watch(function(ev){
      if($scope.currentID != null)
        $scope.customer = $scope.syncQueue[$scope.currentID];
    });
  }

  $scope.changeCustomer = function(k){
    if(k>=0 && k<$scope.syncQueue.length){
      if($scope.currentID != null){
        delete $scope.syncQueue[$scope.currentID].seller;
        $scope.syncQueue.$save($scope.currentID);
      }
      $scope.syncQueue[k].seller = $scope.seller.id;
      $scope.syncQueue.$save(k);
      $scope.customer = $scope.syncQueue[k];
      $scope.currentID = k;
    }
  }
  $scope.initSeller(0);

  $scope.deleteUser = function(index){
    $scope.syncQueue.$remove(index).then(function(){
      console.log(index + " deleted");
    });
  }
})


.controller('UserCtrl', function($scope) {
})

.controller('CustomerCtrl', function($scope) {
})

.controller('ProductCtrl', function($scope, Products) {

})

.controller('ProductDetailCtrl', function($scope, $stateParams, $state, $ionicSlideBoxDelegate, Products) {
  $scope.backUrl = $state.current.backUrl;
  Products.get($stateParams.productId).success(function(product){
    Products.getReviews($stateParams.productId).success(function(reviews) {
      product.reviewAvg = getReviewAvg(reviews);
      product.reviewAvgHtml = getReviewHtml(product.reviewAvg);
      product.reviews = reviews;
      Products.getFaq($stateParams.productId).success(function(faq) {
        product.faq = faq;
        $scope.product = product;
      });
    });
  });
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

.controller('TagCtrl', function($scope, Tags, $ionicPopup) {
    $scope.tags = [];
    $scope.data = {};
    $scope.addTag = function(){

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.newTag" autofocus="true">',
        title: 'Enter tag',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if($scope.data.newTag && $scope.data.newTag != ""){
                $scope.tags.push($scope.data.newTag);
                console.log('TODO : ajout firebase');
              }
            }
          }
        ]
      });
    }
})

.controller('WaitlistCtrl', function($scope) {
  console.log($scope.syncQueue);
  $scope.waitingNumber  = '-1';
  $scope.syncQueue.$loaded(function(){
    $scope.waitingNumber  = $scope.syncQueue.length;
  });
  $scope.syncQueue.$watch(function(ev){
    $scope.waitingNumber  = $scope.syncQueue.length;
  });
  $scope.sellStat  = "82%";
  $scope.chartConfig1 = {
      options: {
        chart: {
          type: 'areaspline',
          zoomType: 'y',
          height: 200
        }
      },
      series: [{
          data: [[8, 10], [9, 15], [10, 12], [11, 8], [12, 7], [13, 1], [14, 1], [15, 19], [16, 15], [17, 10]]
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
  $scope.chartConfig2 = {
        chart: {
            type: 'spline',
            zoomType: 'y',
            height: 200
        },
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
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Clients number'
            },
            min: 0
        },
        series: [{
            name: 'This year',
            data: [
                [Date.UTC(1970,  9, 18), 0   ],
                [Date.UTC(1970,  9, 26), 02 ],
                [Date.UTC(1970, 11,  1), 4],
                [Date.UTC(1970, 11, 11), 5],
                [Date.UTC(1970, 11, 25), 8],
                [Date.UTC(1971,  0,  8), 10],
                [Date.UTC(1971,  0, 15), 12],
                [Date.UTC(1971,  1,  1), 13],
                [Date.UTC(1971,  1,  8), 14],
                [Date.UTC(1971,  1, 21), 15 ],
                [Date.UTC(1971,  2, 12), 18],
                [Date.UTC(1971,  2, 25), 20 ],
                [Date.UTC(1971,  3,  4), 19]
            ]
        }, {
            name: 'Last Year',
            data: [
                [Date.UTC(1970,  9,  9), 0   ],
                [Date.UTC(1970,  9, 14), 01],
                [Date.UTC(1970, 10, 28), 03],
                [Date.UTC(1970, 11, 12), 04],
                [Date.UTC(1971,  0,  1), 05],
                [Date.UTC(1971,  0, 24), 05],
                [Date.UTC(1971,  1,  1), 06],
                [Date.UTC(1971,  1,  7), 06],
                [Date.UTC(1971,  1, 23), 07],
                [Date.UTC(1971,  2,  8), 07],
                [Date.UTC(1971,  2, 14), 07],
                [Date.UTC(1971,  2, 24), 08],
                [Date.UTC(1971,  3,  4), 08 ],
                [Date.UTC(1971,  3, 18), 09],
                [Date.UTC(1971,  3, 24), 09 ],
                [Date.UTC(1971,  4, 16), 03],
                [Date.UTC(1971,  4, 21), 0]
            ]
        }],
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

   $scope.addProductToCustomer = function(product){
    console.log($scope.customer);
    $scope.customer.products[product._id] = product;
    //TODO ADD TAGS !!!
    $scope.syncQueue[$scope.currentID].products[product._id] = product;
    $scope.syncQueue.$save($scope.currentID);
  }
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
