var url = "http://babol.me:3000";
// var url = "http://192.168.43.118:3000";


angular.module('starter.services', [])
.factory('Questions', function($http) {
  return {
    all: function() {
      return $http({
        url: url+'/api/v1/Questions',
        method: 'GET'
      });
    },
    get: function(questionId) {
      return $http({
        url: url+'/api/v1/Questions/'+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Answers', function($http) {
  return {
    get: function(questionId) {
      return $http({
        url: url+'/api/v1/Answers/?questionId='+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Recommendations', function($http) {
  return {
    get: function(recoId) {
      return $http({
        url: url+'/api/v1/Recommendations/'+recoId,
        method: 'GET'
      });
    }
  };
})

.factory('Products', function($http) {
  return {
    get: function(productId) {
      return $http({
        url: url+'/api/v1/Products/'+productId,
        method: 'GET'
      });
    },
    getReviews: function(productId) {
      return $http({
        url: url+'/api/v1/Reviews/?productId='+productId,
        method: 'GET'
      });
    },
    getFaq: function(productId) {
      return $http({
        url: url+'/api/v1/Faqs/?productId='+productId,
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
