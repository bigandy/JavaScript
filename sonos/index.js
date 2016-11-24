var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SonosDiscovery = require('sonos-discovery');

const rooms = [
	'Bedroom',
	'Kitchen',
	'Lounge',
];

const room = rooms[0];

app.get('/', function(req, res){
	res.sendFile('index.html' , { root : __dirname + '/public'});
});

app.use(express.static('public'));

io.on('connection', function(socket){
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
		console.log(getVolume(room));
	})

	socket.on('get favorites', () => {
		// console.log('get the favorites');
		replaceWithFavorite('BBC Radio 6 Music');
	});

	showDefaults();
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
	console.log(player.state.volume);
	return player.setVolume(volume);
}

const getVolume = (room = 'Lounge') => {
	var player = discovery.getPlayer(decodeURIComponent(room));
	return player.state.volume;
}

function isRadio(uri) {
  return uri.startsWith('x-sonosapi-stream:') ||
    uri.startsWith('x-sonosapi-radio:') ||
    uri.startsWith('pndrradio:') ||
    uri.startsWith('x-sonosapi-hls:') ||
    uri.startsWith('x-sonosprog-http:');
}

function showDefaults() {
  var player = discovery.getPlayer(decodeURIComponent(room));
  return player.system.getFavorites()
    .then((favorites) => {
		const favoriteList = favorites.map(x => x.title);
		console.log(player.state);

		console.log(rooms.map((room, i) => {
			console.log(rooms[0]);
			// return { ${rooms[i]}: getVolume(room) };
		}));

		io.sockets.emit('defaults', {
			favoriteList,
			volume: rooms.map((room) => {
				return getVolume(room);
			}),
		})
	});
};


function replaceWithFavorite(favoriteName) {
  // console.log(`replacing with favorite ${favoriteName}`);
  var player = discovery.getPlayer(decodeURIComponent(room));
  return player.system.getFavorites()
    .then((favorites) => {
		const favoriteList = favorites.map(x => x.title);
		console.log(favoriteName);
      	console.log(`found favorites`, favoriteList);

		io.sockets.emit('show Favorites', {favoriteList, favorite: favoriteName})
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
			
    })
    .then((favorite) => {
    //   console.log(`setting AVTransport to ${favorite.uri} with metadata ${favorite.metadata}`);
      return player.setAVTransport(favorite.uri, favorite.metadata);
    })
    .then(() => player.play());
}
