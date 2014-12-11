/* global canvas, AH, requestAnimationFrame, cancelAnimationFrame */
'use strict';
window.AH = {};

AH.init = function () {


	AH.cellClick();


};

AH.cellClick = function () {
	var table = $('#table'),
		info = {};

	table.on('click', 'td', function() {
		var $this = $(this),
			tdClass = $this.attr('class'),
			parent = $this.parent('tr'),
			years,
			standard,
			level;

		$this.addClass('td--active');
		// remove class from other of same class
		$this.siblings('td.' + tdClass).removeClass('td--active');

		years = info['years'] ? info['years'] : 1;
		level = info['level'] ? info['level'] : 1;
		standard = info['standard'] ? info['standard'] : 1;

		if (false === AH.checkRow(parent)) {
			info = {};
			console.log(info);
			$('.output').text('empty!');

			$('.sub-output').text(' ');
		} else {
			$('.output').text(level * standard * years);
		}

		if ($this.data()) {
			info[tdClass] = $this.data(tdClass);
			$('h1.' + tdClass).text(info[tdClass]);
		}

		AH.highlightRow(parent);
	});
};

AH.highlightRow = function (el) {
	el.siblings().removeClass('tr--active');
	el.addClass('tr--active');

	el.siblings().find('td').removeClass('td--active');
};

AH.checkRow = function (el) {
	if (el.hasClass('tr--active')) {
		return true;
	} else {
		return false;
	}
};

AH.init();





