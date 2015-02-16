// var url = "http://192.168.43.118:3000";
var url = "http://babol.me:3000";

angular.module('starter.services', [])


.factory('Products', function($http) {
  return {
    all: function() {
      return $http({
        url: url+'/api/v1/Products/',
        method: 'GET'
      });
    },
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
  }
})

.factory('Tags', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var tags = [
    {name:"Tag1"},
    {name:"Tag2"},
    {name:"Tag3"},
    {name:"Tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag"}
  ];

  return {
    all: function() {
      return tags;
    }
  }
})

.factory('Sellers', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var sellers = [
    {id:1, name: "John Doe", shelf: "Peinture"},
    {id:2, name: "Zlatan", shelf: "Jardin"},
    {id:3, name: "Ribery", shelf: "Peinture"}
  ];

  return {
    all: function() {
      return tags;
    },
    get: function(id){
      return sellers[id % sellers.length]
    }
  }
});
