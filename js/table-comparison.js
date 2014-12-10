/* global canvas, AH, requestAnimationFrame, cancelAnimationFrame */
'use strict';
window.AH = {};

AH.init = function () {
	var table = $('#table'),
		info = {};

	table.on('click', 'td', function() {
		var $this = $(this),
			tdClass = $this.attr('class');

		$this.addClass('td--active');
		// remove class from other of same class
		$this.siblings('td.' + tdClass).removeClass('td--active');

		if ($this.data()) {
			info[tdClass] = $this.data(tdClass);
			$('h1.' + tdClass).text(info[tdClass]);
		}

		var years, standard, level;

		years = info['years'] ? info['years'] : 1;
		level = info['level'] ? info['level'] : 1;
		standard = info['standard'] ? info['standard'] : 1;

		$('.output').text(level * standard * years);


	});
};

AH.init();





