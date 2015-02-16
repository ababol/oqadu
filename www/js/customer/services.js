var url = "http://localhost:3000";
// var url = "http://192.168.43.118:3000";


angular.module('starter.services', [])
.factory('Questions', function($http) {
  return {
    all: function() {
      return $http({
        url: url+'/api/v2/Questions',
        method: 'GET'
      });
    },
    get: function(tags) {
      if (tags === undefined) {
        tags = "";
      }

      return $http({
        url: url+'/api/v2/Questions/Tags/?tags=' + tags,
        method: 'GET'
      });
    }
  };
})

.factory('Recommendations', function($http) {
  return {
    get: function(tags) {
      return $http({
        url: url+'/api/v2/Products/Recommendations/?tags=' + tags,
        method: 'GET'
      });
    }
  };
})

.factory('Products', function($http) {
  return {
    get: function(productId) {
      return $http({
        url: url+'/api/v2/Products/' + productId,
        method: 'GET'
      });
    },
    getProductId: function(barcode) {
      return $http({
        url: url+'/api/v2/Products/Barcode/?barcode=' + barcode,
        method: 'GET'
      });
    },
    getPromo: function() {
      return $http({
        url: url+'/api/v2/Products/Promo',
        method: 'GET'
      });
    }
  };
})

.factory('Waitlist', function($http){
  return{
    addUser: function(user){
      return $http({
        url: url+'/queue/addUser',
        method: 'POST',
        data: {'user': user}
      });
    },
    updateUser: function(user){
      return $http({
        url: url+'/queue/updateUser',
        method: 'POST',
        data: {'user': user}
      });
    }
  };
});
