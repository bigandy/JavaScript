var socket = io(),
	lightOn = document.getElementById('on'),
	lightOff = document.getElementById('off');

lightOn.addEventListener('click', function(e) {
	socket.emit('lights on');

	document.title = 'ON';
}, false);

lightOff.addEventListener('click', function(e) {
	socket.emit('lights off');

	document.title = 'OFF';
}, false);

$('html').click(function(evt){
	if (evt.target.type === "radio") {
		console.log('radio clicked');
		return;
	} else {
		var $body = $('body');
		if ( $body.hasClass('body--on') ) {
			socket.emit('lights off');
		} else {
			socket.emit('lights on');
		}

		$body.toggleClass('body--on');
		$('input[name="onOff"]').not(':checked').prop("checked", true);
	}
});

socket.on('bg change', function(msg) {
	console.log(msg);

	if (msg === 'on') {
		$('body').addClass('body--on');
		document.title = 'ON';
		$('#on').prop("checked", true);
	} else {
		$('body').removeClass('body--on');
		document.title = 'OFF';
		$('#off').prop("checked", true);
	}
});
