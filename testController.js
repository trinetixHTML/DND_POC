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
               categories: [
                   {
                       sort: 1,
                       name: 'Personal Systems',
                       categories: [{ name: 'R&D', items: [{ name: 'Dragable Item 1', sort: 1 }, { name: 'Dragable Item 2', sort: 2 }], sort: 1 },
                                   { name: 'POC', items: [{ name: 'Dragable Item 2', sort: 1 }], sort: 2 }]
                   },
                   {
                       sort: 2,
                       name: 'Imaging & Printing',
                       categories: [{ name: 'R&D', items: [{ name: 'Dragable Item 1', sort: 1 }], sort: 1 }]
                   },
                   {
                       sort: 3,
                       name: 'Printing & Printing',
                       categories: [{ name: 'R&D', items: [{ name: 'Dragable Item 1', sort: 1 }], sort: 1 }]
                   }]
            };

            var category2 = {
                sort: 2,
                name: 'Software',
                categories: [
                    {
                        sort: 1,
                        name: 'Imaging & Printing',
                        categories: [
                            {
                                name: 'test1',
                                sort: 1,
                                items: [{ name: 'Dragable Item 1', sort: 1 }]
                            },
                            {
                                name: 'test2',
                                sort: 2,
                                items: [
                                    { name: 'Dragable Item 1', sort: 1 }, { name: 'Dragable Item 2', sort: 2 },
                                    { name: 'Dragable Item 3', sort: 3 }
                                ]
                            }
                        ]
                    }
                ]
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
                var isChangeSubSubcategorySortingClass = false;
                var managementClass = 'addNewCategory';
                var availableItemSort = 'changeSortingItem';
                var addNewCategoryClass = 'addNewItem';
                var changeSubcategorySortingClass = 'changeSubcategorySorting';
                var changeSubSubcategorySortingClass = 'changeSubSubcategorySorting';


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
                    } else if (item == changeSubSubcategorySortingClass) {
                        isChangeSubSubcategorySortingClass = true;
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
                    _this.moveFromPosition = scope.category.sort;
                }
                else if (isChangeSubSubcategorySortingClass) {
                    _this.draggedElement = { targetObject: 'changeSubSubcategorySorting' };
                    _this.moveFromPosition = scope.$parent.category.sort;
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
                  //  console.log(item);
                    if (item == _this.draggedElement.targetObject && (item == 'enableAdditionCategory' || item == 'enableAddNewItem')) {
                        isAddNewElement = true;
                    } else if (item == _this.draggedElement.targetObject && (item == 'changeSorting' || item == 'changeSubcategorySorting' || item == 'changeSubSubcategorySorting')) {
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
                    //console.log(item);

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

                    var category = {
                        name: 'New category',
                        categories: [],
                        sort: sortPosition
                    };

                    scope.category.categories.push(category);

                } else if (_this.draggedElement.targetObject == 'changeSorting') {
                    var setPostion = scope.item.sort;
                    var scopeCategoryList = angular.element(e.srcElement.parentNode.parentNode).scope();
                    var subCategories = scopeCategoryList.category.items;
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
                    var setPostion = scope.category.sort;
                    var scopeCategoryList = angular.element(e.target.parentNode).scope();
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
                else if (_this.draggedElement.targetObject == 'changeSubSubcategorySorting') {
                    var setPostion = scope.category.sort;
                    var scopeCategoryList = angular.element(e.srcElement.parentElement.parentElement.parentElement).scope();
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

                    if (!scope.category.items) {
                        scope.category.items = [];
                    }
                    if (scope.category.items.length) {
                        sortIdForNewItem = Math.max.apply(null, scope.category.items.map(function (item) { return item.sort; })) + 1;;
                    }
                    scope.category.items.push({
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