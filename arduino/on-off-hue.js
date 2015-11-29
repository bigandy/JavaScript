const 	fs = require('fs'),
		five = require('johnny-five');
		config = require('./config.json');
		lightState = require('node-hue-api').lightState;
		HueApi = require('node-hue-api').HueApi,
		i = 0, j = 0;

var 	board = new five.Board();

var displayResults = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

board.on('ready', function() {
	var ledGreen = new five.Led(12);
	var ledRed = new five.Led(13);
	var onOffBig = new five.Button(2);
	var onOffSmall = new five.Button(3);

	onOffBig.on("down", function () {
		console.log('Big Button has been pressed');
		// ledGreen.off();
		// ledRed.off();
		ledGreen.toggle();
		lightOn(1);

		if (i % 2 == 0) {
			lightOn(1);
		} else {
			lightOff(1);
		}

		console.log(i);
		// console.log(tweet.sendTweet('On Button Pressed' + ' ' + i));
		i++;
	});

	onOffSmall.on("down", function () {

		console.log('Small has been pressed');

		// ledGreen.off();
		// ledRed.off();
		ledRed.toggle();

		if (j % 2 == 0) {
			lightOn(2);
		} else {
			lightOff(2);
		}


		// console.log(tweet.sendTweet('OFF Button Pressed' + ' ' + j));
		j++;
	});

});

var host = config.ip,
	username = config.username,
	api = new HueApi(host, username),
	lightId = 1,
	state = lightState.create().on().brightness(100);

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

function lightOn(lightId) {
	api.setLightState(lightId, state)
		.then(displayResults)
		.done();
}

function lightOff(lightId) {
	api.setLightState(lightId, lightState.create().off())
}
