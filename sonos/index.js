var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SonosDiscovery = require('sonos-discovery');

app.get('/', function(req, res){
	res.sendFile('index.html' , { root : __dirname + '/public'});
});

app.use(express.static('public'));

io.on('connection', function(socket){
	socket.on('music play', function(msg){
		play();
		console.log('play the music');
	});

	socket.on('music pause', function(msg){
		pause();
		console.log('pause the music');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

var discovery = new SonosDiscovery();

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
