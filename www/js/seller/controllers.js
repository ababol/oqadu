angular.module('starter.controllers', ['Helper', 'firebase', 'highcharts-ng'])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})

.controller('MainCtrl', function ($scope, $ionicLoading, $ionicScrollDelegate, $state, $firebase, Sellers) {
  $scope.seller = {id:1, name: "John Doe", shelf: "Peinture"};
  $scope.state = $state;
  $scope.syncQueue = [];
  $scope.customer = {};
  $scope.currentID = null;
  $scope.showLeftMenu = true;

  $scope.showLoader = function() {
    $scope.errorTxt = false;
    $ionicLoading.show();
  };
  $scope.setLeftMenu = function(val){
    $scope.showLeftMenu = val;
  }
  $scope.setSeller = function(seller){
    $scope.seller = seller;
  }
  $scope.hideLoader = function() {
    $ionicLoading.hide();
  };
  $scope.error = function(err) {
    $scope.errorTxt = "API ERROR " + err.status + " - " + JSON.stringify(err.data);
  };
  $scope.refreshScroll = function() {
    $ionicScrollDelegate.resize();
  };
  $scope.getCurrentID = function(){
    return $scope.currentID;
  }
  $scope.addTagToCustomer = function(tag){
    if(!$scope.customer.tags)
      return;
    if(!$scope.syncQueue[$scope.currentID].tags["custom"]){
      $scope.syncQueue[$scope.currentID].tags["custom"] = [[]];
    }
    $scope.syncQueue[$scope.currentID].tags["custom"][0].push(tag);
    $scope.syncQueue.$save($scope.currentID);
  };
  $scope.deleteCustomerTag = function(shelf, shelfindex, index){
    if(!$scope.customer.tags || !$scope.customer.tags[shelf][shelfindex] || index >= $scope.customer.tags[shelf][shelfindex].length)
      return;
    $scope.syncQueue[$scope.currentID].tags[shelf][shelfindex].splice(index, 1);
    $scope.syncQueue.$save($scope.currentID);
  };

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
      // if($scope.syncQueue[k].seller != null && $scope.syncQueue[k].seller != $scope.seller.id)
      //   return;
      $scope.customer = $scope.syncQueue[k];
      // if($scope.currentID != null){
      //   $scope.syncQueue[$scope.currentID].seller = null;
      //   $scope.syncQueue.$save($scope.currentID);
      // }
      // $scope.syncQueue[k].seller = $scope.seller.id;
      // $scope.syncQueue.$save(k);
      $scope.currentID = k;
    }
  }
  $scope.initSeller(0);

  $scope.deleteUser = function(){
    var index = $scope.currentID;
    $scope.currentID = null;
    $scope.customer = {};
    $scope.syncQueue.$remove(index).then(function(){
      console.log(index + " deleted");
    });
  };

  $scope.addCustomer = function(customer) {
    $scope.syncQueue[$scope.currentID].customer = customer;
    $scope.syncQueue.$save($scope.currentID);
  };
})

.controller('UserCtrl', function($scope) {
})

.controller('ScanCtrl', function($scope, $location, $cordovaBarcodeScanner, $ionicPopup, User) {
  // $cordovaBarcodeScanner.scan()
  // .then(function(imageData) {
    imageData = {
      text: "123456"
    };
    User.getByClientId(parseInt(imageData.text, 10))
      .then(function(customer) {
        console.log("custoner", customer)
        $ionicPopup.alert({
          title: "Client Trouvé!",
          template: "La carte de <b>" + customer.data[0].name + "</b> a été correctement scannée."
        })
        .then(function() {
          $scope.addCustomer(customer.data[0]);
          $location.path("tab/user?userAdded=true");
        });
      })
      .catch(function(err) {
        $ionicPopup.alert({
          title: "Erreur " + err.status,
          template: err.data
        })
        .then(function() {
          $location.path("tab/user");
        });
      });
  // });
})

.controller('CustomerCtrl', function($scope) {
})

.controller('CartCtrl', function($scope, $q, Products) {
  var cart = $scope.customer.cart,
    promise = $q.when();

  $scope.cartProducts = [];
  console.log("///////////cartCtrl");
  console.log(cart);
  function callback() {
    console.log("callback");
    var deferred = $q.defer();

    if (!cart || cart.length === 0) {
      return deferred.resolve();
    }

    cart.forEach(function(productId, key) {
      $q.when(
        Products.get(productId)
      ).then(function(product) {
        $scope.cartProducts.push(product.data);
        console.log(product);
        // Si on a parcouru tout le tableau de produit, on peut valider la promesse
        if (key === cart.length - 1) {
          console.log($scope.cartProducts);
          return deferred.resolve();
        }
      });
    });

    return deferred.promise;
  }

  callback();
  // loader($scope, $q.when(callback));
})

.controller('ProductCtrl', function($scope,$q, utils) {
  $scope.recoProducts = [];
  var refreshProducts = function(){
    var id = $scope.getCurrentID();
    if(id != null)
        $scope.customer = $scope.syncQueue[id];
    $scope.recoProducts = [];
    if($scope.customer == {})
      return;
    for(var shelf in $scope.customer.tags){
      $q.when(
        utils.post($scope.customer.tags[shelf])
      ).then(function(products){
        $scope.recoProducts = $scope.recoProducts.concat(products.data);
      });
    }
  }
  refreshProducts();
  $scope.syncQueue.$watch(function(e){
    var id = $scope.getCurrentID();
    var k = $scope.syncQueue.$keyAt(id);
    if(e.event == "child_changed" && e.key == k)
      refreshProducts();
  });
})

.controller('LoginCtrl', function($scope, $location, User){
  $scope.setLeftMenu(false);
  $scope.login = function(data){
    User.login(data.username, data.password).then(function(user) {
      console.log(user)
      $location.path("/tab/user");
      $scope.setSeller(user.data);
      $scope.setLeftMenu(true);
    }).catch(function(err) {
      $scope.error = err.data;
    });
  };
})

.controller('ProductDetailCtrl', function($scope, $q, $stateParams, $state, $ionicSlideBoxDelegate, utils, Products) {
  loader($scope, $q.when(
    Products.get($stateParams.productId)
  ).then(function(product) {
    $scope.product = product.data;
  }));
  $scope.updateSlider = function () {
    return $ionicSlideBoxDelegate.update();
  };
})

.controller('TagCtrl', function($scope, $ionicPopup) {
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
              $scope.addTagToCustomer($scope.data.newTag);
            }
          }
        }
      ]
    });
  };
  $scope.removeTag = function(shelf, index){
    console.log(index);
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete tag',
      template: 'Are you sure you want to delete this tag?'
    });
    confirmPopup.then(function(res) {
     if(res) {
       $scope.deleteCustomerTag(shelf, index);
     }
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

.controller('AllProductsCtrl', function($scope, $q, Products) {
  // Infinite Scroll
  function initProducts() {
    $scope.products = [];
    $scope.noMoreItems = false;
    $scope.skip = 0;
  }

  function getMoreProducts() {
    var deferred = $q.defer();
    Products.all($scope.skip * 25, 25)
    .then(function(products) {
      if (products.data.length === 0) {
        $scope.noMoreItems = true;
      }

      $scope.products = $scope.products.concat(products.data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      return deferred.resolve();
    })
    .catch(function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  }

  $scope.loadMoreProducts = function() {
    $scope.skip++;
    getMoreProducts();
  };
  // End Infinite Scroll
  initProducts();
  loader($scope, $q.when(getMoreProducts()));

  // Search
  var doSearch = ionic.debounce(function(query) {
    Products.search(query).then(function(products) {
      $scope.products = products.data;
    });
  }, 500);

  $scope.search = function() {
    // don't search if no query
    if ($scope.query === "") {
      initProducts();
      getMoreProducts();
    } else {
      doSearch($scope.query);
    }
  };
  // End Search

  $scope.addProductToCustomer = function(product){
    console.log($scope.customer);
    $scope.customer.products[product._id] = product;
    //TODO ADD TAGS !!!
    $scope.syncQueue[$scope.currentID].products[product._id] = product;
    $scope.syncQueue.$save($scope.currentID);
  };
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

function loader($scope, callback) {
  $scope.showLoader();

  callback
  .catch($scope.error)
  .finally(function() {
    $scope.hideLoader();
  });
}
