angular.module('Helper', [])
.factory('utils', function($http) {
  return {
    getReviewAvg: function(reviews) {
      if (reviews.length === 0) {
        return "N/A";
      }

      var reviewSum = 0;
      reviews.forEach(function(review) {
        reviewSum += review.score;
      });
      return Math.round(reviewSum);
    },
    getReviewHtml: function(reviews) {
      var reviewAvg = this.getReviewAvg(reviews),
          reviewHtml = [];

      if (reviewAvg === "N/A") {
        return [];
      }

      for (var i = 1; i <= 5; i++) {
        if (i <= reviewAvg) {
          reviewHtml.push("ion-ios7-star");
        } else {
          reviewHtml.push("ion-ios7-star-outline");
        }
      }
      return reviewHtml;
    },
    getRecos: function(tags, productId) {
      return $http({
        url: url+'/api/v2/Products/Recommendations',
        data: {tags: tags, productId: productId},
        method: 'POST'
      });
    },
    getCartDetails: function($scope, $q, Products, utils, cart){
      $scope.products = [];

      function callback() {
        var deferred = $q.defer();

        if (!cart || cart.length === 0) {
          return deferred.resolve();
        }

        cart.forEach(function(productId, key) {
          $q.when(
            Products.get(productId)
          ).then(function(product) {
            product.data.reviewAvgHtml = utils.getReviewHtml(product.data.reviews);
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
    }
  };
})
.directive('toggleMain', function() {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        scope.checked = !scope.checked;
        angular.element(element.parent()[0].querySelector('.toggleContent')).toggleClass('ng-hide');
        element[0].querySelector('input').checked = scope.checked;
        scope.refreshScroll();
      });
    }
  };
})
.filter('join', function() {
  return function(input, splitChar) {
    return input.join(splitChar);
  }
});
