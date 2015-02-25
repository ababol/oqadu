var url = "http://192.168.43.62:3000";

angular.module('starter.services', [])


.factory('Products', function($http) {
  return {
    all: function(skip, limit) {
      return $http({
        url: url+'/api/v2/Products/?skip=' + skip + '&limit=' + limit,
        method: 'GET'
      });
    },
    get: function(productId) {
      return $http({
        url: url+'/api/v2/Products/'+productId,
        method: 'GET'
      });
    },
    search: function(query) {
      return $http({
        url: url + "/api/v2/Products/Search/?name=" + query,
        method: 'GET'
      });
    }
  }
})


.factory('Sellers', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var sellers = [
    {id:1, password: "123456", username: "JohnDoe", name: "John Doe", shelf: "Outillage"},
    {id:2, password: "123456", username: "Zlatan", name: "Zlatan", shelf: "Outillage"},
    {id:3, password: "123456", username: "Ribery", name: "Ribery", shelf: "Outillage"}
  ];

  return {
    all: function() {
      return sellers;
    },
    get: function(id){
      return sellers[id % sellers.length]
    },
    getByLogin: function(username, pass) {
      var user = null;
      var l = sellers.length;
      var i = 0;
      while(i < l && user == null){
        if(sellers[i].username == username && sellers[i].password == pass)
          user = sellers[i];
        i++;
      }
      return user;
    }
  }
})

.factory('User', function($http) {
  return {
    login: function(username, pass) {
      return $http({
        url: url+'/api/v2/Users/Login',
        data: {username: username, password: pass},
        method: 'POST'
      });
    },
    getByClientId: function(clientId) {
      return $http({
        url: url+'/api/v2/Users/?clientId=' + clientId + '&limit=1',
        method: 'GET'
      });
    }
  }
});
