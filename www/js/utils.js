angular.module('Helper', [])
.factory('utils', function() {
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
    getReviewHtml: function(reviewAvg) {
      if (reviewAvg === "N/A") {
        return [];
      }

      var reviewHtml = [];
      for (var i = 1; i <= 5; i++) {
        if (i <= reviewAvg) {
          reviewHtml.push("ion-ios7-star");
        } else {
          reviewHtml.push("ion-ios7-star-outline");
        }
      }
      return reviewHtml;
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
});;
