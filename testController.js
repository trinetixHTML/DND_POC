(function () {
    'use strict';

    angular.module('ict').controller('testController', ['$scope', '$rootScope', '$timeout',
        function testController($scope, $rootScope, $timeout) {
            var _this = this;

            $scope.mainItems = [];

            var product = {
                categories: [],
                name: 'Products'
            };





            $scope.categories = [];

            var category1 = {
               name: 'Printing & Personal System Group',
               sort: 1,
               class2: true,
               firstClass: true,
               categories: [
                   {
                       halfClass: true,
                       firstClass: true,
                       sort: 1,
                       name: 'Personal Systems',
                       categories: [{ title: 'R&D', name: 'Dragable Item 1', sort: 1 }, { title: 'POC', name: 'Dragable Item 2', sort: 2 }]
                   },
                   {
                       halfClass: true,
                       lastClass: true,
                       sort: 2,
                       name: 'Imaging & Printing',
                       categories: [{ title: 'R&D', name: 'Dragable Item 1', sort: 1 }]
                   }]
            };

            var category2 = {
               sort: 2,
               name: 'Software',
               class1: true,
               categories: [
                   {
                       lastClass: true,
                       firstClass: true,
                       sort: 1,
                       name: 'Imaging & Printing',
                       categories: [{ title: 'test1', name: 'Dragable Item 1', sort: 1 }, { title: 'test2', name: 'Dragable Item 2', sort: 2 }, { title: 'test2', name: 'Dragable Item 3', sort: 3 }]
                   }]
            };

            product.categories.push(category1);
            product.categories.push(category2);





            $scope.mainItems.push(product);

            $scope.sourceDragableItems = [];

            $scope.sourceDragableItems.push({
                id: 0,
                sort: 0,
                name: 'Add new Category',
                management: true
            });

            $scope.sourceDragableItems.push({
                id: 1,
                sort: 1,
                name: 'Dragable Item 1',
                addItem: true
            });
            $scope.sourceDragableItems.push({
                id: 2,
                sort: 2,
                name: 'Dragable Item 2',
                addItem: true
            });

            $scope.sourceDragableItems.push({
                id: 3,
                sort: 3,
                name: 'Dragable Item 3',
                addItem: true
            });

            $scope.sourceDragableItems.push({
                id: 4,
                sort: 4,
                name: 'Dragable Item 4',
                addItem: true
            });



            function handleDragStart(e) {

                //is management
                var isManagementClass = false;
                var isAvailableAddItem = false;
                var isAvailableChangeSort = false;
                var isChangeSubcategorySorting = false;
                var managementClass = 'addNewCategory';
                var availableItemSort = 'operatingModel__level3';
                var addNewCategoryClass = 'addNewItem';
                var changeSubcategorySortingClass = 'changeSubcategorySorting';


                var scope = angular.element(e.srcElement).scope();

                e.target.classList.forEach(function (item) {
                    if (item == managementClass) {
                        isManagementClass = true;
                    } else if (item == addNewCategoryClass) {
                        isAvailableAddItem = true;
                    } else if (availableItemSort == item) {
                        isAvailableChangeSort = true;
                    } else if (item == changeSubcategorySortingClass) {
                        isChangeSubcategorySorting = true;
                    }
                });

                if (isManagementClass) {
                    _this.draggedElement = { targetObject: 'enableAdditionCategory' };
                }
                else if (isAvailableAddItem) {
                    _this.draggedElement = { targetObject: 'enableAddNewItem', text: e.target.innerText };
                }
                else if (isAvailableChangeSort) {
                    _this.draggedElement = { targetObject: 'changeSorting' };
                    _this.moveFromPosition = scope.item.sort;
                }
                else if (isChangeSubcategorySorting) {
                    _this.draggedElement = { targetObject: 'changeSubcategorySorting' };
                    _this.moveFromPosition = scope.subCategory.sort;
                }
            }

            function handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }


                //e.dataTransfer.dropEffect = 'move';
                //return false;


                var isAddNewElement = false;
                var isMoveElement = false;

                e.target.classList.forEach(function (item) {
                    if (item == _this.draggedElement.targetObject && (item == 'enableAdditionCategory' || item == 'enableAddNewItem')) {
                        isAddNewElement = true;
                    } else if (item == _this.draggedElement.targetObject && (item == 'changeSorting' || item == 'changeSubcategorySorting')) {
                        isMoveElement = true;
                    }
                });

                if (_this.draggedElement && isAddNewElement) {
                    e.dataTransfer.dropEffect = 'copy'
                    this.classList.add('over');

                    return false;
                } else if (_this.draggedElement && isMoveElement) {
                    e.dataTransfer.dropEffect = 'move'
                    this.classList.add('over');

                    return false;
                } else {
                    e.dataTransfer.dropEffect = 'none';
                }

                //isExistsClass = false;

                return false;
            }

            function handleDragEnter(e) {

                e.target.classList.forEach(function (item) {
                    console.log(item);

                });

            }

            function handleDragLeave(e) {
                this.classList.remove('over');
            }

            function handleDrop(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                var scope = angular.element(e.srcElement).scope();
                if (_this.draggedElement.targetObject == 'enableAdditionCategory') {
                    var sortPosition = 1;

                    if (scope.category.categories.length) {
                        sortPosition = Math.max.apply(null, scope.category.categories.map(function (item) { return item.sort; })) + 1;;
                    }

                    var item = {
                        lastClass: true,
                        firstClass: true,
                        class1: true,
                        name: 'New category',
                        categories: [],
                        sort: sortPosition
                    };

                    scope.category.categories.push(item);

                } else if (_this.draggedElement.targetObject == 'changeSorting') {
                    var setPostion = scope.item.sort;
                    var scopeCategoryList = angular.element(e.currentTarget).scope();
                    var subCategories = scopeCategoryList.subCategory.categories;
                    var isDown = _this.moveFromPosition - setPostion < 0;
                    subCategories.forEach(function (item) {

                        if (item.sort == _this.moveFromPosition) {
                            item.sort = setPostion;
                        }
                        else if (item.sort >= setPostion && !isDown) {
                            item.sort++;
                        }
                        else if (item.sort <= setPostion && isDown) {
                            item.sort--;
                        }

                    });

                } else if (_this.draggedElement.targetObject == 'changeSubcategorySorting') {
                    var setPostion = scope.subCategory.sort;
                    var scopeCategoryList = angular.element(e.currentTarget.parentElement).scope();
                    var subCategories = scopeCategoryList.category.categories;
                    var isDown = _this.moveFromPosition - setPostion < 0;
                    subCategories.forEach(function (item) {

                        if (item.sort == _this.moveFromPosition) {
                            item.sort = setPostion;
                        }
                        else if (item.sort >= setPostion && !isDown) {
                            item.sort++;
                        }
                        else if (item.sort <= setPostion && isDown) {
                            item.sort--;
                        }

                    });
                }
                else if (_this.draggedElement.targetObject == 'enableAddNewItem') {

                    var value = _this.draggedElement.text;
                    var sortIdForNewItem = 1;

                    if (scope.subCategory.categories.length) {
                        sortIdForNewItem = Math.max.apply(null, scope.subCategory.categories.map(function (item) { return item.sort; })) + 1;;
                    }
                    scope.subCategory.categories.push({
                        title: 'title_' + value, name: 'name_' + value, sort: sortIdForNewItem
                    });

                    initializeEventListeners();
                }

                $scope.$apply();

                return false;
            }

            function handleDragEnd(e) {
                //[].forEach.call(cols, function (col) {
                //    col.classList.remove('over');
                //});
            }

            function removeEventListeners() {

            }

            initializeEventListeners();

            function initializeEventListeners() {
                $timeout(function () {
                    //subscribe dragStartEvent
                    var dragStartItems = document.querySelectorAll('.dragStart');

                    var eventsForSubscribe = [
                        { eventName: 'dragstart', handler: handleDragStart },
                        { eventName: 'dragover', handler: handleDragOver },
                        { eventName: 'dragend', handler: handleDragEnd },
                        { eventName: 'dragleave', handler: handleDragLeave },
                    ];

                    dragStartItems.forEach(function (item) {
                        runSubscribeEvents(item, eventsForSubscribe);

                    });

                    var dropHandlerItems = document.querySelectorAll('.handlerDrop');

                    dropHandlerItems.forEach(function (item) {

                        var eventsForSubscribe = [
                            { eventName: 'drop', handler: handleDrop },
                            { eventName: 'dragover', handler: handleDragOver },
                            { eventName: 'dragleave', handler: handleDragLeave },
                            { eventName: 'dragenter', handler: handleDragEnter },
                            { eventName: 'dragend', handler: handleDragEnd },
                        ];

                        runSubscribeEvents(item, eventsForSubscribe);
                    });

                    function runSubscribeEvents(item, eventsforSubscribe) {

                        if (!item.listSubscribedEvents) {
                            item.listSubscribedEvents = [];
                        }

                        eventsforSubscribe.forEach(function (event) {
                            if (item.listSubscribedEvents.indexOf(event.eventName) == -1) {
                                item.addEventListener(event.eventName, event.handler, false);
                                item.listSubscribedEvents.push(event.eventName);
                            }
                        });
                    }
                }, 0);
            }


        }]);
}());