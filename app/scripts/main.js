'use strict';
function debug(msg) {
	var log = document.getElementById('debuglog');

	if (!log) {
		log = document.createElement('div');
		log.id = 'debuglog';
		log.innerHTML = '<h1>Debug Log</h1>';
		document.body.appendChild(log);
	}

	var pre = document.createElement('pre'),
		text = document.createTextNode(msg);
	pre.appendChild(text);
	log.appendChild(pre);
}

// function hide(e, reflow) {
// 	if (reflow) {
// 		e.style.display = 'none';
// 	} else {
// 		e.style.visibility = 'hidden';
// 	}
// }

// function highlight(e) {
// 	if (!e.className) {
// 		e.className = 'highlight';
// 	} else {
// 		e.className += 'highlight';
// 	}
// }

debug('funky chicken');
// hide(this, true);
// highlight()


window.onload = function() {
	var buttons = document.getElementsByTagName('button'),
		input = document.getElementById('inputBox');

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

	for (var i = 0; i < buttons.length; i++) {
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
