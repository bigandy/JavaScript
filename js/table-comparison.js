/* global AH, $, window */
'use strict';
window.AH = {};

AH.init = function () {
	AH.cellClick();
};

AH.cellClick = function () {
	var table = $('#table');

	table.on('click', 'td', function () {
		var $this = $(this),
			tdClass = $this.attr('class'),
			parent = $this.parent('tr'),
			years,
			standard,
			level;

		$this.addClass('td--active');
		// remove class from other of same class
		$this.siblings('td.' + tdClass).removeClass('td--active');



		if ($this.data()) {
			parent.data($this.data());

			parent.data(tdClass, $this.data(tdClass));
			$('h1.' + tdClass).text(parent.data(tdClass));
		}


		if (typeof(parent.data('level')) !== 'undefined') {
			level = parent.data('level');
		} else {
			level = 1;
		}

		if (typeof(parent.data('standard')) !== 'undefined') {
			standard = parent.data('standard');
		} else {
			standard = 1;
		}

		if (typeof(parent.data('years')) !== 'undefined') {
			years = parent.data('years');
		} else {
			years = 1;
		}

		$('.output').text(level * standard * years);

		AH.highlightRow(parent);
	});
};

AH.highlightRow = function (el) {
	// remove class from sibling rows
	// remove data from siblings
	// remove class from sibling row tds
	el.siblings()
		.removeClass('tr--active')
		.removeData()
		.find('td').removeClass('td--active');

	// add class to current row
	el.addClass('tr--active');
};

AH.checkRow = function (el) {
	if (el.hasClass('tr--active')) {
		return true;
	} else {
		return false;
	}
};

AH.init();





