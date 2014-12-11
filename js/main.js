/* global localStorage, window, document */
'use strict';

var buttons = document.getElementsByTagName('button'),
	input = document.getElementById('inputBox');

function debug(msg) {
	var log = document.getElementById('debuglog'),
		pre = document.createElement('pre'),
		text = document.createTextNode(msg);

	if (!log) {
		log = document.createElement('div');
		log.id = 'debuglog';
		log.innerHTML = '<h1>Debug Log</h1>';
		document.body.appendChild(log);
	}


	pre.appendChild(text);
	log.appendChild(pre);
}

debug('funky chicken');

window.onload = function () {


	input.addEventListener('focus', function () {

		var number = this.value;
		localStorage.number = number;

		if (localStorage.number !== '') {
			console.log(localStorage.number);
			input.value(localStorage.number);
		}

	});

	function hides(event) {
		event.target.style.visibility = 'hidden';
	}

	for (var i = buttons.length; i--;) {
		var button = buttons[i];

		if (button.addEventListener) {
			button.addEventListener('click', hides, false);
		} else {
			button.attachEvent('onclick', hides); // <= ie8
		}
	}

	window.addEventListener('funkyChicken', hides);



};


localStorage.andrewName = 'andrew';
localStorage.andrewAge = 33;
localStorage.sex = 'male';

console.log(localStorage.number);


console.dir(localStorage.sex);
