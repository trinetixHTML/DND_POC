(function () {
	'use strict';

	angular.module('ict').directive('zoomLevel', [function () {
		return {
			restrict : "A",
			scope: true,
			template : "<div class='zoomLevel'><button ng-click='decrease()' class='btn zoomLevel__decrease'>-</button> <span ng-click='restoreDefaults()' class='zoomLevel__currentZoom' ng-bind='currentZoomLevel'></span> <button ng-click='increase()' class='btn zoomLevel__increase'>+</button></div>",
			link: function(scope, element, attrs){

				var zoomLevel = 1;
				var elementToZoom = document.getElementById(attrs.zoomLevel);

				scope.currentZoomLevel = zoomLevel * 100;

				var changeZoomLevel = function(){
					angular.element(elementToZoom)[0].style.zoom = zoomLevel;
					scope.currentZoomLevel = parseInt(zoomLevel * 100, 10);
				}

				scope.restoreDefaults = function(){
					zoomLevel = 1;
					changeZoomLevel();					
				}

				scope.decrease = function (){
					zoomLevel -= 0.1;
					changeZoomLevel();
				}
				scope.increase = function (){
					zoomLevel += 0.1;
					changeZoomLevel();
				}
			}
		}
	}]);
}());