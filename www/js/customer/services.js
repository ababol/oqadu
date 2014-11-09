angular.module('starter.services', [])
.factory('Questions', function($http) {
  return {
    all: function() {
      return $http({
        url: 'http://localhost:3000/api/v1/Questions',
        method: 'GET'
      });
    },
    get: function(questionId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Questions/'+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Answers', function($http) {
  return {
    get: function(questionId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Answers/?questionId='+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Recommendations', function($http) {
  return {
    get: function(answerId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Recommendations/?answerId='+answerId,
        method: 'GET'
      });
    }
  };
})

.factory('Products', function($http) {
  return {
    get: function(productId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Products/'+productId,
        method: 'GET'
      });
    }
  };
});
