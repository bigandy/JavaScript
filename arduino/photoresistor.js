var five = require("johnny-five"),
	board,
	photoresistor;

board = new five.Board();

board.on("ready", function() {
	var led = new five.Led(12),
		threshold = 200,
		frequencySeconds = .1;

	// Create a new `photoresistor` hardware instance.
	photoresistor = new five.Sensor({
		pin: "A5",
		freq: frequencySeconds * 3000,
	});

	// "data" get the current reading from the photoresistor
	photoresistor.on("data", function() {
		if (this.value > threshold) {
			led.on();
			console.log(this.value);
		} else {
			led.off();
		}
	});
});


// References
//
// http://nakkaya.com/2009/10/29/connecting-a-photoresistor-to-an-arduino/
