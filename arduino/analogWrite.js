var five  = require('johnny-five'),
	board = new five.Board();

board.on('ready', function () {
	this.pinMode(12, five.Pin.PWM);
	this.analogWrite(12, 255);
});