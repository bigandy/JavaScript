const 	fs = require('fs'),
		five = require('johnny-five');

var 	board = new five.Board();

board.on('ready', function() {
	var led = new five.Led(10);

	var sensor = new five.Sensor({
		  pin: "A0",
		  // freq: 250,
		  threshold: 50
		});

	// Scale the sensor's data from 0-1023 to 0-10 and log changes
	sensor.scale(0, 100).on('change', function() {
		console.log(this.value.toFixed(0));

		led.brightness(this.value);
	});

});
