angular.module('starter.services', []);
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);
angular.module('starter.controllers', []);
(function() {
  angular.element(document).ready(function () {
    var logo = Snap.select("#logo");
    var leroy = logo.select("#leroy"),
      	merlin = logo.select("#merlin"),
        triangle = logo.select("#triangle"),
      	TIME_ANIM = 500;

    leroy.animate({
    	// transform: "t0,1,r0"
       transform: "t0,0s1,1,0,0"
    }, TIME_ANIM);

    merlin.animate({
    	// transform: "t0,1,r0"
      // transform: "t0,-200,r180"
       transform: "t0,0S1,1,0,0"
    }, TIME_ANIM);

    setTimeout(function(){
      window.location.href = "customer.html";
    }, 2000);

    triangle.animate({opacity:1,transform:"s1,1"}, 2000, mina.elastic);
  });
})();
