angular.module('starter.controllers', ['Helper', 'firebase'])
.constant('$ionicLoadingConfig', {
  template: "<img src='img/loader.gif' width='80'/>"
})
.controller('MainCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, $ionicLoading, $ionicScrollDelegate, $firebase) {
  $scope.showLoader = function() {
    $scope.errorTxt = false;
    $scope.loaded = false;
    $ionicLoading.show();
  };
  $scope.hideLoader = function(loaded) {
    $scope.loaded = loaded;
    $ionicLoading.hide();
  };
  $scope.showFooter = function() {
    $scope.hideFoot = false;
  };
  $scope.hideFooter = function() {
    $scope.hideFoot = true;
  };
  $scope.refreshScroll = function() {
    $ionicScrollDelegate.resize();
  };
  $scope.error = function(err) {
    $scope.hideFoot = true;
    $scope.errorTxt = "API ERROR " + err.status + " - " + err.data;
  };
  $scope.setUserKey = function(key) {
    $scope.userKey = key;
  };
  $scope.getUserKey = function() {
    return $scope.userKey || null;
  };
  $scope.getUser = function() {
    return $scope.user;
  };
  $scope.updateSlider = function() {
    return $ionicSlideBoxDelegate.update();
  };

  $scope.user = {
    qa: {},
    products: [],
    cart: [],
    waiting: false,
    tags: {},
    actual: {
      shelf: "",
      tags: [],
      qIds: []
    }
  };

  $rootScope.registered = false;
  //Sync user object with firebase when regitered
  $scope.$watch('user', function(){
    if(!$rootScope.registered)
      return
    var index = $scope.syncQueue.$indexFor($scope.getUserKey());
    console.log(index);
    $scope.syncQueue[index].qa = $scope.user.qa;
    $scope.syncQueue[index].products = $scope.user.products;
    $scope.syncQueue[index].cart = $scope.user.cart;
    $scope.syncQueue[index].waiting = $scope.user.waiting;
    $scope.syncQueue[index].tags = $scope.user.tags;
    $scope.syncQueue[index].actual = $scope.user.actual;
    $scope.syncQueue.$save(index).then(function(){console.log("updated");});
  },true);


  //Firebase
  $scope.connectedQueue = null;
  $scope.connectToFirebaseQueue = function(queue) {
    var ref = new Firebase("https://oqadu.firebaseio.com/" + queue + "/queue"),
      sync = $firebase(ref);

    $scope.syncQueue = sync.$asArray();
    $scope.connectedQueue = queue;
    console.log("https://oqadu.firebaseio.com/" + queue + "/queue");
    return $scope.syncQueue;
  };
  var ref = new Firebase("https://oqadu.firebaseio.com/queue"),
    sync = $firebase(ref);
  $scope.syncQueue = sync.$asArray();
})

.controller('QuestionCtrl', function($scope, $rootScope, $q, $location, Questions) {
  $scope.question = {};

  loader($scope, $q.when(
    Questions.getQuestion($scope.user.actual.tags, $scope.user.actual.qIds)
  ).then(function(question) {
    var data = question.data;
    if (data === "Not any remaining questions.") {
      return $location.path("recommendation");
    } else {
      $scope.question = question.data;
    }
  }));

  $scope.selectAnswer = function(data) {
    if (!$scope.user.actual.shelf) {
      var shelf = data.tags[0];
      if(!$rootScope.registered)
        $scope.connectToFirebaseQueue(shelf);
      initTags($scope, shelf, []);
    }
    $scope.user.qa[$scope.question._id] = {
      question: $scope.question,
      answer: data
    };
    var index = $scope.user.tags[$scope.user.actual.shelf].length-1;
    $scope.user.tags[$scope.user.actual.shelf][index] = $scope.user.tags[$scope.user.actual.shelf][index].concat(data.tags);
    $scope.user.actual.tags = $scope.user.actual.tags.concat(data.tags);
    $scope.user.actual.qIds.push($scope.question._id);
  };

  $scope.gotoBackQuestion = function(){
    gotoBackQuestion($scope, $location);
  }
})

.controller('RecommendationCtrl', function($scope, $q, $location, $stateParams, utils, Products) {
  $scope.products = [];
  $scope.title = "Recommandation";

  loader($scope, $q.when(
    utils.getRecos($scope.user.actual.tags)
  ).then(function(recos) {
    $scope.products = recos.data;
    $scope.products.forEach(function(reco) {
      reco.reviewAvgHtml = utils.getReviewHtml(reco.reviews);
    });

    if(!$scope.user.products) {
      $scope.user.products = [];
    }
    $scope.user.products = $scope.user.products.concat(recos.data);
  }));

  $scope.gotoBackQuestion = function(){
    gotoBackQuestion($scope, $location);
  }
})

.controller('ProductCtrl', function($scope, $rootScope, $q, $stateParams, $location, utils, Products) {
  $scope.product = {};

  loader($scope, $q.when(
    Products.get($stateParams.productId)
  ).then(function(product) {
    var deferred = $q.defer();

    // Si non enregistré et que le client accede a la page produit via le scan
    // on display la bar + connect firebase
    if (!$rootScope.registered && $location.search().scan) {
      var shelf = product.data.tags[0];
      $scope.connectToFirebaseQueue(shelf);
      initTags($scope, shelf, product.data.tags);
    }

    $scope.product = product.data;
    $scope.product.reviewAvgHtml = utils.getReviewHtml(product.data.reviews);

    utils.getRecos(product.data.tags, product.data._id)
    .then(function(products) {
      $scope.product.recos = products.data;

      $scope.product.recos.forEach(function(reco) {
        reco.reviewAvgHtml = utils.getReviewHtml(reco.reviews);
      });
      return deferred.resolve();
    })
    .catch(function(err) {
      return deferred.reject(err);
    });

    return deferred.promise;
  }));

  $scope.addToCart = function(id) {
    var index = $scope.getInTheCart(id);
    console.log(index);
    if (index > -1) {
      $scope.user.cart.splice(index, 1);
    } else {
      $scope.user.cart.push(id);
    }
  };

  $scope.getInTheCart = function(id) {
    return $scope.user.cart.indexOf(id);
  };
})

.controller('HomeCtrl', function($scope, $rootScope, $ionicViewService, Products) {
  $scope.user.actual.tags = [];
  $scope.user.actual.qIds = [];
  console.log($rootScope.registered)
  if (!$scope.user.actual.shelf || !$rootScope.registered) {
    $scope.hideFooter();
    $scope.hideLoader(true);
    $ionicViewService.clearHistory();
  }
  $scope.user.actual.shelf = null;
})

.controller('LoadingCtrl', function($state) {
  angular.element(document.querySelector('#loading')).removeClass('hide');
  var logo = Snap.select("#logo"),
    leroy = logo.select("#leroy"),
    merlin = logo.select("#merlin"),
    triangle = logo.select("#triangle"),
    TIME_ANIM = 500;

  leroy.animate({
     transform: "t0,0s1,1,0,0"
  }, TIME_ANIM);

  merlin.animate({
     transform: "t0,0S1,1,0,0"
  }, TIME_ANIM);

  setTimeout(function() {
    angular.element(document.querySelector('#loading')).addClass('fadeNone');
  }, 2000);


  setTimeout(function() {
    angular.element(document.querySelector('#loading')).addClass('hide');
  }, 2500);

  setTimeout(function() {
    $state.transitionTo("home");
  }, 200);

  triangle.animate({opacity:1,transform:"s1,1"}, 2000, mina.elastic);
})

.controller('BarCtrl', function($scope, $rootScope, $location) {
  $rootScope.registered = false;
  $scope.waitlistPosition = "";
  $scope.waitTime = -1;
  $scope.registerQueue = function() {
    if (!$scope.user.waiting) {
      $scope.user.waiting = true;
      if (window.plugins && window.plugins.toast) {
        window.plugins.toast.showShortBottom('Inscription "' + $scope.connectedQueue + '"');
      }
      $scope.syncQueue.$add($scope.user).then(function(userRef){
        $scope.setUserKey(userRef.key());
        console.log($scope.syncQueue.length);
        var pos = $scope.syncQueue.$indexFor(userRef.key()) +1;
        $scope.waitlistPosition = transformPositionToString(pos);
        $scope.waitTime = pos * 3;
        $rootScope.registered = true;
      });
      $scope.syncQueue.$watch(function(e){
        var pos = $scope.syncQueue.$indexFor($scope.getUserKey()) + 1;
        $scope.waitlistPosition = transformPositionToString(pos);
        if(pos === 1){
          console.log('Beep')

          if (window.plugin && window.plugin.notification) {
            window.plugin.notification.local.add({
                id:      1,
                title:   'C\'est à vous',
                message: 'Un conseiller vous attend.'
            });
          }
        }
        $scope.waitTime = pos * 3;
      });
    }
  };
  $scope.unregisterQueue = function() {
    if ($scope.user.waiting) {
      $scope.user.waiting = false;
      $scope.syncQueue.$remove($scope.syncQueue.$indexFor($scope.getUserKey())).then(function(userRef){
        if (window.plugins && window.plugins.toast) {
          window.plugins.toast.showShortBottom("Désinscription effectuée");
        }
        $rootScope.registered = false;
        if ($location.path() === "/home") {
          $scope.hideFooter();
        }
        console.log("remove from waitlist");
      });
    }
  };
})

.controller('CartCtrl', function($scope, $q, utils, Products) {
  var cart = $scope.user.cart;

  $scope.products = [];
  $scope.title = "Panier";

  function callback() {
    var deferred = $q.defer();

    if (cart.length === 0) {
      return deferred.resolve();
    }

    cart.forEach(function(productId, key) {
      $q.when(
        Products.get(productId)
      ).then(function(product) {

        // product.reviewAvg = utils.getReviewAvg(data[1].data);
        // product.reviewAvgHtml = utils.getReviewHtml(product.reviewAvg);
        // product.reviews = data[1].data;

        $scope.products.push(product.data);

        // Si on a parcouru tout le tableau de produit, on peut valider la promesse
        if (key === cart.length - 1) {
          return deferred.resolve();
        }
      });
    });

    return deferred.promise;
  }

  loader($scope, $q.when(callback()));
})

.controller('ScanCtrl', function($scope, $q, $location, $cordovaBarcodeScanner, $ionicPopup, Products) {
  $cordovaBarcodeScanner.scan()
    .then(function(imageData) {
      Products.getProductId(imageData.text)
        .then(function(id) {
          $location.path("product/" + JSON.parse(id.data) + "?scan=true");
        })
        .catch(function(err) {
          $ionicPopup.alert({
            title: "Erreur " + err.status,
            template: err.data
          })
          .then(function() {
            $location.path("home");
          });
        });
    });
});

function initTags($scope, shelf, tags) {
  if (window.plugins && window.plugins.toast) {
    window.plugins.toast.showLongBottom('Vous pouvez dès à présent vous insrire à la file d\'attente auprès du conseiller "' + shelf + '"');
  }

  $scope.showFooter();
  $scope.user.actual = {
    shelf: shelf,
    tags: tags,
    qIds: []
  };
  if(!$scope.user.tags[shelf])
    $scope.user.tags[shelf] = [];
  $scope.user.tags[shelf].push(tags);
}

function loader($scope, callback) {
  $scope.showLoader();

  callback
  .catch($scope.error)
  .finally(function() {
    if (window.location.hash.indexOf("product") > -1) {
      setTimeout(function() {
        $scope.hideLoader(false);
        setTimeout(function() {
          $scope.hideLoader(true);
          $scope.updateSlider();
        }, 300);
      }, 400);
    } else {
      $scope.hideLoader(true);
    }
  });
}

function gotoBackQuestion($scope, $location){
  //Suppression du champ actual.qId de l'ancienne question
  var lastQId = $scope.user.actual.qIds.pop(),
    correspondantQA = $scope.user.qa[lastQId],
    previousQTags = correspondantQA.answer.tags;

  //Suppression du champ actual.tags ceux générés par la réponse à cette question
  for(var tagId = 0; tagId < previousQTags.length; tagId++){
    $scope.user.actual.tags.pop();
  }

  //Suppression de la QA correspondant à la lastQId
  delete $scope.user.qa[lastQId];

  //Suppression des tags correspondants aux tags fournis par la réponse à la lastQ
  var index = $scope.user.tags[$scope.user.actual.shelf].length-1,
    userTags = $scope.user.tags[$scope.user.actual.shelf][index];

  for(var tagId = 0; tagId < previousQTags.length; tagId++){
    var i = userTags.indexOf(previousQTags[tagId]);
    userTags.splice(i, 1);
  }

  //Changement de l'URL pour refresh
  $location.path('/question/'+$scope.user.actual.qIds[$scope.user.actual.qIds.length-1]);
}

function transformPositionToString(position) {
  var extension = "";
  switch(position){
    case 1:
      extension = "er";
      break;
    default:
      extension ="ème";
      break;
  }
  return position + extension;
}
