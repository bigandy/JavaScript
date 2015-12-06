var SonosDiscovery = require('sonos-discovery');
var discovery = new SonosDiscovery();

const 	fs = require('fs'),
		five = require('johnny-five'),
		config = require('./config.json'),
		lightState = require('node-hue-api').lightState,
		HueApi = require('node-hue-api').HueApi;

var 	board = new five.Board();

var displayResults = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

board.on('ready', function() {
	var onOffBig = new five.Button(2);
	var onOffSmall = new five.Button(3);
	var onOffAll = new five.Button(4);

	var i = 0,
		j = 0,
		k = 0;

	onOffBig.on("down", function () {
		console.log('Big Button has been pressed');

		if (i > 0){
			playPause();

			toggleLight(1);
		}

		i++;
	});

	onOffSmall.on("down", function () {

		console.log('Small has been pressed');

		if (j > 0){
			playPause();
			toggleLight(2);
		}

		j++;
	});

	onOffAll.on("down", function () {
		console.log('The All Button has been pressed');

		if (k > 0){
			playPause();

			toggleLight(1);
			toggleLight(2);
		}

		k++;
	});

});


function playPause(room) {
	room = room || 'Lounge';
	var player = discovery.getPlayer(decodeURIComponent('Lounge'));

	if (player) {
		if(player.coordinator.state['currentState'] == 'PLAYING') {
			player.coordinator.pause();
			console.log('lets pause');
		} else {
			player.coordinator.play();
			console.log('lets play');
		}
	}
}

function pause(room) {
	room = room || 'Lounge';

	var player = discovery.getPlayer(decodeURIComponent(room));
	player.coordinator.pause();
}

function play(room) {
	room = room || 'Lounge';

	var player = discovery.getPlayer(decodeURIComponent(room));
	player.coordinator.play();
}

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

function lightOn(lightId) {
	api.setLightState(lightId, state)
		.then(displayResults)
		.done();
}

function lightOff(lightId) {
	api.setLightState(lightId, lightState.create().off())
}

function toggleLight(lightId) {
	api.lightStatus(lightId, function(err, result) {
	    if (err) throw err;
	    console.log(result.state.on);
	    var state = result.state.on;

	    if (state === false) {
	    	console.log('turn light ' + lightId + ' on');
	    	lightOn(lightId);
	    } else {
	    	console.log('turn light ' + lightId + ' off');
	    	lightOff(lightId);
	    }
	});
	// api.getLightState(lightIds);
}
