var app = angular.module('app', ['ui.multiselect.transfer']);

app.controller('MainCtrl', function ($scope) {
    $scope.items = [{id: 1, name: "United States"}, {id: 2, name: "Afghanistan"}, {id: 3, name: "Albania"}];
    $scope.selected = [{id: 3, name: "Albania"}];
});
