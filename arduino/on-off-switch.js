// On/Off Switches

var five = require("johnny-five"),
	tweet = require("../node/twitter-v2.js"),
	board = new five.Board()
	d = new Date();

board.on("ready", function() {

	var onButton = new five.Button(2),
		offButton = new five.Button(4),
		ledRed = new five.Led(13),
		ledGreen = new five.Led(12),
		i = 1,
		j = 1;

	onButton.on("down", function () {
		console.log('ON has been pressed');
		// ledGreen.off();
		// ledRed.off();
		ledGreen.toggle();
		console.log(tweet.sendTweet('On Button Pressed' + ' ' + i));
		i++;
	});

	offButton.on("down", function () {
		console.log('OFF has been pressed');
		// ledGreen.off();
		// ledRed.off();
		ledRed.toggle();
		console.log(tweet.sendTweet('OFF Button Pressed' + ' ' + j));
		j++;
	});
});
