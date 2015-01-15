// Multiple LEDs
// modified code from
// http://node-ardx.org/exercises/2

var d = new Date(),
	five = require("johnny-five"),
	leds=[],
	ledPins = [2,3,4,5,6,7,8,9],
	myBoard = new five.Board(),
	d = new Date();

myBoard.on("ready", function() {
	var i = ledPins.length,
	timeAmplifier = 10;
	// initialize LEDs using a while loop
	while (i--){
		var myLed = new five.Led(ledPins[i]);
		leds.push(myLed);
	}

	function oneAfterAnother() {
		var delay = 0;
			myBoard.counter = 0,
			ledLength = leds.length,
			i = ledLength;

		while (i--) {

			myBoard.wait(delay, function () {
				// console.log(this.counter + " on");
				leds[this.counter].on();
			});

			console.log(d.getSeconds() * timeAmplifier);

			myBoard.wait(delay + (d.getSeconds() * timeAmplifier), function () {
				// console.log(this.counter + " off");
				leds[this.counter].off();
				this.counter = (this.counter + 1) % leds.length;
			});

			delay += (d.getSeconds() * timeAmplifier);
		}
	}

	oneAfterAnother();
	myBoard.loop((d.getSeconds() * timeAmplifier) * leds.length, oneAfterAnother);
});
