'use strict';

var Ctrl = function ($scope) {
	$scope.name = 'Andrew JD Hudson';
};

var AnotherCtrl = function ($scope) {
	$scope.age = '33';


	$scope.$watch('name', function () {
		console.log($scope.name);
	});
};