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
});
