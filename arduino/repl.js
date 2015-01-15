var five = require ('johnny-five'),
	board = new five.Board();


board.on("ready", function () {
	this.repl.inject({
		led: new five.Led(12)
	});
});

// run node repl.js
// then when running:
// led.on(); // turns LED on
// led.off(); // turns LED off