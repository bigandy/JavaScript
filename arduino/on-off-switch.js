// On/Off Switches

var five = require("johnny-five"),
	// twitter = require("../node/twitter.js"),
	board = new five.Board(),
	onButton,
	offButton,
	ledRed,
	ledGreen;

board.on("ready", function() {

	onButton = new five.Button(2);
	offButton = new five.Button(4);
	ledRed = new five.Led(13);
	ledGreen = new five.Led(12);

	onButton.on("down", function () {
		console.log('On has been pressed');
		ledGreen.off();
		ledRed.off();
		ledGreen.on();
	});

	offButton.on("down", function () {
		console.log('off has been pressed');
		ledGreen.off();
		ledRed.off();
		ledRed.on();
	});
});
