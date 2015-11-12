

const 	fs = require('fs'),
		five = require('johnny-five');

var 	board = new five.Board();

function getTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? '0' : '') + sec;

    return hour + ':' + min + ':' + sec;
}

function getDate() {
	var date = new Date();

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? '0' : '') + month;

	var day  = date.getDate();
	day = (day < 10 ? '0' : '') + day;

	return day + '-' + month + '-' + year

}

board.on('ready', function() {
	var led = new five.Led(12),
		frequencySeconds = 30,
		temperature = new five.Thermometer({
			controller: 'TMP36',
			pin: 'A5',
			freq: frequencySeconds * 1000,
		}),
		path = 'output/temperature/' + getDate() + '.txt';

	temperature.on('data', function() {
		var temperature = this.C.toFixed(2);

		fs.appendFile(path, temperature + ' ' + getTime() + '\r\n', function(err) {
			if(err) {
				throw err;
				console.log(err);
			}
			console.log(getTime() + ' ' + temperature);
		});
	});
});
