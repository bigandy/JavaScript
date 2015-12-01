var five = require("johnny-five");
var Rasp = require("raspi-io");

var board = new five.Board({
    io: new Rasp()
});

board.on("ready", function() {
    var led = new five.Led(12);
    led.blink();
});
