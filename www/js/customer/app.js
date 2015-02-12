// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($rootScope, $ionicPlatform, $ionicPopup) {
  var history = 0;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.show({
          title: "Connexion Internet Requise",
          content: "Une connexion internet est requise afin que l'application puisse fonctionner.",
          buttons: [
            {
              text: 'Cancel',
              onTap: function(e) {
                ionic.Platform.exitApp();
                if (navigator.connection.type == Connection.NONE) {
                  //don't allow the user to close unless he has a connection
                  e.preventDefault();
                }
              }
            },
            {
              text: '<b>Ok</b>',
              type: 'button-balanced',
              onTap: function(e) {
                if (navigator.connection.type == Connection.NONE) {
                  //don't allow the user to close unless he has a connection
                  e.preventDefault();
                }
              }
            }
          ]
        });
      }
    }
  });

  $rootScope.$on('$locationChangeSuccess', function() {
    history++;
    $rootScope.showBackButton = (history >= 2);
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('question', {
      url: '/question/:questionId',
      templateUrl: 'templates/customer/question.html',
      controller: 'QuestionCtrl'
    })

    .state('loading', {
      url: '/loading',
      views: {
        'loading': {
          templateUrl: 'templates/customer/loading.html',
          controller: 'LoadingCtrl'
        }
      }
    })

    .state('home', {
      url: '/home',
      templateUrl: 'templates/customer/home.html',
      controller: 'HomeCtrl'
    })

    .state('scan', {
      url: '/scan',
      controller: 'ScanCtrl'
    })

    .state('recommendation', {
      url: '/recommendation/:recoId',
      templateUrl: 'templates/customer/recommendation.html',
      controller: 'RecommendationCtrl'
    })

    .state('cart', {
      url: '/cart',
      templateUrl: 'templates/customer/recommendation.html',
      controller: 'CartCtrl'
    })

    .state('product', {
      url: '/product/:productId',
      templateUrl: 'templates/customer/product.html',
      controller: 'ProductCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');

});
