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
			level,
			yearsTrue,
			outputText = '';

		// if you click on the element with parent that doesn't have class tr--active,
		// remove text from all .sub-output elements
		if (false === AH.checkRow(parent)) {
			// console.log('false');
			// $('.sub-output').text('');
			// highlight the row
			AH.highlightRow(parent);
		}


		// add class to the clicked td
		$this.addClass('td--active');
		// remove class from other of same class
		$this.siblings('td.' + tdClass).removeClass('td--active');

		if ($this.data()) {
			parent.data($this.data());

			parent.data(tdClass, $this.data(tdClass));
			$('div.' + tdClass).text(parent.data(tdClass));
		}

		// checks to see if there is a parent.data('level'),
		// assign if is, otherwise let it equal 1
		// TODO : way of looping these so less code.

		if ('undefined' !== typeof(parent.data('level'))) {
			level = parent.data('level');
		} else {
			level = 1;
		}

		if ('undefined' !== typeof(parent.data('standard'))) {
			standard = parent.data('standard');
		} else {
			standard = 1;
		}

		if ('undefined' !== typeof(parent.data('years'))) {
			years = parent.data('years');
		} else {
			years = 1;
		}

		// the text depending on what has been clicked on and when
		// TODO: must be a better way of writing this!
		if (1 !== level) {
			if (1 !== standard && 1 !== years) {
				outputText = 'all have been selected!';
			} else if (1 !== standard) {
				outputText = 'level + standard';
			} else if (1 !== years) {
				outputText = 'level + years';
			} else {
				outputText = 'level only';
			}
		} else if (1 !== standard) {
			if (1 !== level && 1 !== years) {
				outputText = 'all have been selected!';
			} else if (1 !== level) {
				outputText = 'standard + level';
			} else if (1 !== years) {
				outputText = 'standard + years';
			} else {
				outputText = 'standard only';
			}
		} else if (1 !== years) {
			if (1 !== standard && 1 !== level) {
				outputText = 'all have been selected!';
			} else if (1 !== standard) {
				outputText = 'standard + years';
			} else if (1 !== level) {
				outputText = 'level + years';
			} else {
				outputText = 'years only';
			}
		}

		// asign the calculation to the text of .output
		$('.output').text(level * standard * years);
		$('.output-text').html(outputText);
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
