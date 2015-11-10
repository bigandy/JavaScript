var five  = require('johnny-five'),
	board = new five.Board();

board.on('ready', function () {
	this.pinMode(0, five.Pin.PWM);
	this.analogWrite(0, 255);
});
