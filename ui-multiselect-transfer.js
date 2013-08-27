angular.module('ui.multiselect.transfer', [])
.directive('uimultiselect', function() {
    return {
        restrict: 'EA',
        templateUrl: 'ui-multiselect-transfer.html',
        replace: true,
        scope: {
            selected: '=',
            items: '=',
        },
        link: function(scope, element, attrs) {
            scope.unselectedItems = scope.unselected;
            scope.selectedItems = scope.selected;

            scope.selectall = function() {
                scope.selected = scope.items;
                scope.unselected = [];
            }
            scope.unselectall = function() {
                scope.selected = [];
                scope.unselected = scope.items;
            }
            scope.select = function() {
                var el, i;

                for(i in scope.selectedItems) {
                    el = findSelectedElement(scope.selectedItems[i]);
                    scope.selected.splice($.inArray(el, scope.selected),1);
                    scope.unselected.push(el);
                }

                sort(scope.unselected);
                sort(scope.selected);
            }
            scope.unselect = function() {
                var el, i;

                for(i in scope.unselectedItems) {
                    el = findUnselectedElement(scope.unselectedItems[i]);
                    scope.unselected.splice($.inArray(el, scope.unselected),1);
                    scope.selected.push(el);
                }

                sort(scope.unselected);
                sort(scope.selected);
            }

            scope.$watchCollection('selected', function(newSelected, oldSelected) {
                if (null == newSelected) {
                    scope.selected = [];
                }
            });

           function watchCollection(newItems, oldItems) {
                scope.unselected = [];
                $.grep(scope.items, function(el) {
                    if (!$.grep(scope.selected, function(e) { return e.id == el.id; }).length) {
                        scope.unselected.push(el);
                    }
                });
                sort(scope.unselected);
            }
            scope.$watchCollection('items', watchCollection);
            scope.$watchCollection('selected', watchCollection);

            function sort(array) {
                if (array.length > 0) {
                    return array.sort(_sortByName);
                }
            }

            function findSelectedElement(id) {
                var element;
                $.each(scope.selected, function(index, el) {
                    if (id == el.id) {
                        element = el;
                        return;
                    }
                });

                return element;
            }

            function findUnselectedElement(id) {
                var element;
                $.each(scope.unselected, function(index, el) {
                    if (id == el.id) {
                        element = el;
                        return;
                    }
                });

                return element;
            }

            function _sortByName(a, b) {
                var aName = a.name.toLowerCase();
                var bName = b.name.toLowerCase(); 
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
        }
    }
});
