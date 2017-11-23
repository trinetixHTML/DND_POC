(function () {
	'use strict';

	angular.module('ict').directive('snapOnResize', [function () {
		return {
			link: function(scope, element, attrs){
				var thisWidth = angular.element(element)[0].clientWidth,
					parentWidth = angular.element(element)[0].offsetParent.clientWidth;
				angular.element(element).on("resize", myScript);
				var myScript = function(){
					console.log('resized')
				}
			}
		}
	}]);
}());