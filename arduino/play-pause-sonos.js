var SonosDiscovery = require('sonos-discovery');
var discovery = new SonosDiscovery();

const 	fs = require('fs'),
		five = require('johnny-five');
		config = require('./config.json');

var 	board = new five.Board();

board.on('ready', function() {
	var onOffBig = new five.Button(2);
	var onOffSmall = new five.Button(3);
	var i = 0,
		j = 0;

	onOffBig.on("down", function () {
		console.log('Big Button has been pressed');

		if (i > 0){
			play();
		}

		i++;
	});

	onOffSmall.on("down", function () {

		console.log('Small has been pressed');

		if (j > 0){
			pause();
		}

		j++;
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
