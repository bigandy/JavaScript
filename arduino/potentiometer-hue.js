const 	fs = require('fs'),
		five = require('johnny-five');
		config = require('./config.json');
		lightState = require('node-hue-api').lightState;
		HueApi = require('node-hue-api').HueApi;

var 	board = new five.Board();

var displayResults = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

board.on('ready', function() {
	var led = new five.Led(10);

	var sensor = new five.Sensor({
		  pin: "A0",
		  freq: 1000,
		  threshold: 100
		});

	// Scale the sensor's data from 0-1023 to 0-10 and log changes
	sensor.scale(0, 100).on('change', function() {
		console.log(this.value.toFixed(0));

		led.brightness(this.value);
		lightsValue(this.value.toFixed(0));
	});

});

var host = config.ip,
	username = config.username,
	api = new HueApi(host, username),
	lightId = 1,
	state = lightState.create().on().brightness(75);

function lightsValue(brightness) {
	if (brightness === '0') { // if brightness is zero turn off.
		state = lightState.create().off();
	} else { // otherwise run the brightness at the assigned value
		state = lightState.create().on().brightness(brightness);
	}

	api.setGroupLightState(lightId, state)
		// .then(displayResults)
		.done();
}
