var five = require("johnny-five");
var board = new five.Board();
var pin = 2;

board.on("ready", function() {

  var led = new five.Led(pin);

  // "blink" the led in 500ms on-off phase periods
  led.blink(60);
});
