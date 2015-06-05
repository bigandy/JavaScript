'use strict';

(function(){
	var app = angular.module('convertor', []);

	var rates = {
		kmMiles: 0.621371192,
		milesKm: 1.609344,
		defaultKm: 100,
		defaultMiles: 100
	}

	app.controller('KmToMilesController', function ($scope) {
		this.rate = rates;

		// set the default to 100 for both
		// $scope.convertorKm = this.rate.defaultKm;


		$scope.$watch('convertorKm', function(km) {
			$scope.miles = km * rates.kmMiles;

		});

		$scope.inputClear = function() {
			$scope.convertorKm = "";
		}
	});

	app.controller('MilestoKmController', function ($scope) {
		this.rate = rates;

		// set the default to 100
		// $scope.convertorMiles = this.rate.defaultMiles;

		$scope.$watch('convertorMiles', function(miles) {
			$scope.kilometers = miles * rates.milesKm;
		});

		$scope.inputClear = function() {
			$scope.convertorMiles = "";
		}
	});

	// Focuses on the input after input has been zeroed by angular's inputClear
	$('.input-clear').on('click', function() {
		$(this).prev().focus();
	});




})();

