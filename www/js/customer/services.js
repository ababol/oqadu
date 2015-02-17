var url = "https://oqadu.herokuapp.com";
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
    post: function(tags, qId) {
      return $http({
        url: url+'/api/v2/Questions/Next',
        data: {tags: tags, qId: qId},
        method: 'POST'
      });
    }
  };
})

.factory('Recommendations', function($http) {
  return {
    post: function(tags) {
      return $http({
        url: url+'/api/v2/Products/Recommendations',
        data: tags,
        method: 'POST'
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
