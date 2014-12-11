'use strict';

var Ctrl = function ($scope) {
    $scope.name = 'Andrew Hudson';
    $scope.age = '33';
};

var AnotherCtrl = function ($scope) {
    $scope.name = 'Andrew Hudson';
    $scope.age = '33';
    $scope.$watch('name', function () {
        console.log($scope.name);
    });
};
