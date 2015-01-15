// Multiple LEDs
// modified code from
// http://node-ardx.org/exercises/2

var d = new Date();

// console.log("Hours : " + d.getHours() + " Minutes : " + d.getMinutes() + " Seconds : " + d.getSeconds());

var five = require("johnny-five"),
	leds=[],
	ledPins = [2,3,4,5,6,7,8,9],
	myBoard = new five.Board(),
	d = new Date();



myBoard.on("ready", function() {
	var i = ledPins.length,
	timeAmplifier = 10;
	// initialize LEDs using a for loop
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

// var five = require("johnny-five");
// var board, leds=[], ledPins = [2,3,4,5,6,7,8,9];
// board = new five.Board();
// board.on("ready", function() {

//   // initialize LEDs using a for loop
//   for (var i = 0; i < ledPins.length; i++){
//       var myLed = new five.Led(ledPins[i]);
//       leds.push(myLed);
//   }
//   function allOn(){
//     for (var i = 0; i < leds.length; i++) {
//         leds[i].on();
//     }
//   }
//   function allOff(){
//     for (var i = 0; i < leds.length; i++) {
//         leds[i].off();
//     }
//   }
//   function oneAfterAnother() {
//       var delay = 1;
//       board.counter = 0;
//       for (var i = 0; i < leds.length; i++) {
//         var led = leds[i];
//         board.wait(delay,function(){
//             console.log(this.counter + " on");
//             leds[this.counter].on();
//         });
//         board.wait(delay + 200,function(){
//             console.log(this.counter + " off");
//             leds[this.counter].off();
//             this.counter = (this.counter + 1) % leds.length;
//         });
//         delay += 500;
//       }
//   }
//   // allOn();
//   // board.wait(1000,allOff);
//   oneAfterAnother();
//   board.loop(4500, oneAfterAnother);
// });
