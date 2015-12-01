var redis = require('redis');
var client = redis.createClient();
var socket_redis = require('socket.io-redis');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile('index.html' , { root : __dirname + '/public'});
});

app.use(express.static('public'));

// io.adapter(socket-redis({ host: 'localhost', port: 6379 }));

client.on('connect', function() {
	console.log('connected to redis');
});

io.on('connection', function(socket){

	client.get('on:off', function(err, reply) {
		console.log('Light state is ' + reply);
		io.emit('bg change', reply);
	});

	socket.on('lights on', function(msg){
		console.log('Turn on the lights');

		client.set('on:off', 'on', function(err, reply) {
			console.log(reply);
		});

		client.get('on:off', function(err, reply) {
			console.log('Light state is ' + reply);
			io.emit('bg change', reply);
		});

		// console.log('lights are: ' + client.get('on:off'));
	});

	socket.on('lights off', function(msg){
		console.log('Turn the lights off');

		client.set('on:off', 'off', function(err, reply) {
			console.log(reply);
		});

		client.get('on:off', function(err, reply) {
			console.log('Light state is ' + reply);
			io.emit('bg change', reply);
		});
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

