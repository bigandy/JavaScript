var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});

board.on('ready', function() {
	console.log('Board is Ready');

	var onBig = new five.Led(7);
	    onSmall = new five.Button(2),
		onAll = new five.Button(3)
		i = 0,
		j = 0,
		k = 0;

	onBig.on("down", function () {
		console.log('Big Button has been pressed');

		console.log(i);
		i++;
	});

	onSmall.on("down", function () {
		console.log('Small Button has been pressed');

		console.log(j);
		j++;
	});

	onAll.on("down", function () {
		console.log('All Button has been pressed');

		console.log(j);
		k++;
	});
});
