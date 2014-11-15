// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
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

    .state('recommendation', {
      url: '/recommendation/:answerId',
      templateUrl: 'templates/customer/recommendation.html',
      controller: 'RecommendationCtrl'
    })

    .state('product', {
      url: '/product/:productId',
      templateUrl: 'templates/customer/product.html',
      controller: 'ProductCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');

});
