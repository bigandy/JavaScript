var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SonosDiscovery = require('sonos-discovery');
var socketIO = require('socket.io');

const room = 'Bedroom';

app.get('/', function(req, res){
	res.sendFile('index.html' , { root : __dirname + '/public'});
});

app.use(express.static('public'));

io.on('connection', function(socket){
	// socket.on('update room', () => {
	// 	console.log('thing happened');
	// });

	socket.on('update room', (msg) => {
		if (msg.action === 'play') {
			play(msg.room);
			console.log('play the music');
		} else {
			pause(msg.room);
			console.log('pause the music');
		}
	});

	socket.on('update room volume', (msg) => {
		changeVolume(msg.room, msg.volume);
	})

	socket.on('get favorites', () => {
		// console.log('get the favorites');
		replaceWithFavorite('BBC Radio 6 Music');
	})
});

http.listen(3000, function(){
	console.log('listening on http://localhost:3000');
});

var discovery = new SonosDiscovery();

const playPause = (room = 'Lounge') => {
	var player = discovery.getPlayer(decodeURIComponent(room));

	if (player) {
		if (player.coordinator.state['currentState'] === 'PLAYING') {
			player.coordinator.pause();
			console.log('lets pause');
		} else {
			player.coordinator.play();
			console.log('lets play');
		}
	}
}

const pause = (room = 'Lounge') => {
	var player = discovery.getPlayer(decodeURIComponent(room));
	player.coordinator.pause();
}

const play = (room = 'Lounge') => {
	var player = discovery.getPlayer(decodeURIComponent(room));
	player.coordinator.play();
}

const changeVolume = (room = 'Lounge', volume) => {
	var player = discovery.getPlayer(decodeURIComponent(room));
	return player.setVolume(volume);
}


function isRadio(uri) {
  return uri.startsWith('x-sonosapi-stream:') ||
    uri.startsWith('x-sonosapi-radio:') ||
    uri.startsWith('pndrradio:') ||
    uri.startsWith('x-sonosapi-hls:') ||
    uri.startsWith('x-sonosprog-http:');
}

function replaceWithFavorite(favoriteName) {
  // console.log(`replacing with favorite ${favoriteName}`);
  var player = discovery.getPlayer(decodeURIComponent(room));
  return player.system.getFavorites()
    .then((favorites) => {
		const favoriteList = favorites.map(x => x.title);
		console.log(favoriteName);
      	console.log(`found favorites`, favoriteList);

		io.sockets.emit('ace in the hole', {favoriteList, favorite: favoriteName})
	//   console.log('there are ', favorites.length, ' favorites');
	//   console.log('WOOP!', favorites.find((fav) => fav.title.toLowerCase() === favoriteName.toLowerCase()));
      return favorites.find((fav) => fav.title.toLowerCase() === favoriteName.toLowerCase());
    })
    .then((favorite) => {
      if (!favorite) {
        throw new Error('Favorite not found');
      }

      if (isRadio(favorite.uri)) {
        // console.log(`favorite is radiostation`);
        return favorite;
      }

    //   console.log('clearing queue');
    //   return this.clearQueue()
    //     .then(() => console.log(`Adding ${favorite.uri} to queue with metadata ${favorite.metadata}`))
    //     .then(() => player.addURIToQueue(favorite.uri, favorite.metadata))
    //     .then(() => console.log(`triggering queue mode`))
    //     .then(() => {
    //       return { uri: `x-rincon-queue:${this.uuid}#0` };
    //     });
    })
    .then((favorite) => {
    //   console.log(`setting AVTransport to ${favorite.uri} with metadata ${favorite.metadata}`);
      return player.setAVTransport(favorite.uri, favorite.metadata);
    })
    .then(() => player.play());
}
