(function () {
	'use strict';

	angular.module('ict').directive('resizeBlock', ['$document', function ($document) {
		return {
			scope: {
				columnCounts: '=',
				currentColumn: '='
			},
			link: function(scope, element, attrs){

				var startX, startY, startWidth, startHeight, posLeft, posTop, shadow,
					resizebleBlock = angular.element(element),
					resized = angular.element(resizebleBlock)[0],
					canvasToListen = $document.find('body'),
					parent = angular.element(element)[0].offsetParent,
					parentWidth = parseInt(parent.offsetWidth, 10),
					defaultWidth = parseInt(resized.offsetWidth, 10),
					isWidthChanged = false;

				var GAP_BETWEEN_COLUMNS = 30;



				function snappingToRight(width){
					console.log(width, defaultWidth)
					if(width > defaultWidth && (width%parentWidth)==0){
						shadow[0].style.width = defaultWidth + parentWidth + GAP_BETWEEN_COLUMNS + 'px';
						defaultWidth = parseInt(shadow[0].style.width, 10);
					}
					// if(width < defaultWidth && (width%parentWidth)==0){
					// 	shadow[0].style.width = defaultWidth - parentWidth - GAP_BETWEEN_COLUMNS + 'px';
					// 	defaultWidth = parseInt(shadow[0].style.width, 10)
					// }
				}


				function init(e){

					element.off('click');					

					if(scope.columnCounts == 1){
						return;
					}

					resizebleBlock.addClass('resizable');

					var resizerLM = angular.element('<div class="resizerLM"><div>');
					var resizerRM = angular.element('<div class="resizerRM"><div>');
					var resizerBM = angular.element('<div class="resizerBM"><div>');
					var resizerTM = angular.element('<div class="resizerTM"><div>');
					element.append(resizerLM);
					element.append(resizerRM);
					element.append(resizerBM);
					element.append(resizerTM);
					resizerLM.on('mousedown', initDragLeft);
					resizerRM.on('mousedown', initDragRight);
					resizerBM.on('mousedown', initDragBottom);
					resizerTM.on('mousedown', initDragTop);

					if(scope.currentColumn == 1){
						resizerLM[0].outerHTML = ('');
					}
					if(scope.currentColumn == scope.columnCounts){
						resizerRM[0].outerHTML = ('');
					}
				}

				function startPoint(e) {
					startX = e.clientX;         
					startY = e.clientY;
					startWidth = parseInt(resized.offsetWidth, 10);
					startHeight = parseInt(resized.offsetHeight, 10);
					posLeft = parseInt(resized.style.left, 10);
					posTop = parseInt(resized.style.top, 10);
					e.preventDefault();
					shadow = angular.element('<div class="dragSnappingShadow"><div>')
					element.append(shadow);
				}

				function initDragRight(e) {        
					startPoint(e);         
					canvasToListen.on('mousemove', doDragRight);
					canvasToListen.on('mouseup', stopDrag);
				}
				function initDragBottom(e) {           
					startPoint(e);
					canvasToListen.on('mousemove', doDragBottom);
					canvasToListen.on('mouseup', stopDrag);
				}
				function initDragLeft(e) {
					startPoint(e);
					canvasToListen.on('mousemove', doDragLeft);
					canvasToListen.on('mouseup', stopDrag);
				}
				function initDragTop(e) {          
					startPoint(e);
					canvasToListen.on('mousemove', doDragTop);
					canvasToListen.on('mouseup', stopDrag);
				}

				function doDragRight(e) {
					var width = startWidth + e.clientX - startX;
					resized.style.width = width + 'px';
					resized.style.maxWidth = parentWidth * (scope.columnCounts - scope.currentColumn + 1) + GAP_BETWEEN_COLUMNS*(scope.columnCounts - scope.currentColumn) + 'px';
					snappingToRight(width);
					isWidthChanged = true;
				}
				function doDragBottom(e) {
					var height = startHeight + e.clientY - startY;
					resized.style.height = height + 'px';
					isWidthChanged = false;
				}
				function doDragTop(e) {
					var top = e.clientY - startY;
					(posTop) ? resized.style.top = posTop + top + 'px' : resized.style.top = top + 'px';          
					resized.style.height = (startHeight - top) + 'px';
					isWidthChanged = false;
				}
				function doDragLeft(e) {
					var left = e.clientX - startX;
					(posLeft) ? resized.style.left = posLeft + left + 'px' : resized.style.left = left + 'px';
					resized.style.width = (startWidth - left) + 'px';
				}

				function stopDrag(e) {
					canvasToListen.off('mousemove', doDragRight);
					canvasToListen.off('mousemove', doDragLeft);
					canvasToListen.off('mousemove', doDragBottom);
					canvasToListen.off('mousemove', doDragTop);
					canvasToListen.off('mouseup', stopDrag);
					shadow[0].outerHTML = ('');
					if(isWidthChanged){
						element[0].style.width = shadow[0].style.width;
						defaultWidth = parseInt(element[0].style.width, 10);
					}
					console.log(defaultWidth)
				}

				element.on('click', init);
			}
		}
	}]);
}());