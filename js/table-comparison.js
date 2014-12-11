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


		// TODO: must be a better way of writing this!

		if (1 !== level) {
			outputText = '<span>Select a Standard and number of Years</span>';

			if (1 !== standard && 1 !== years) {
				console.log('all have been selected!');
			} else if (1 !== standard) {
				console.log('level + standard');
			} else if (1 !== years) {
				console.log('level + years');
			} else {
				console.log('level only');
			}

		} else {
			outputText = '<span class="negative">Level has no value</span>';
			$('div.level').text('');
		}

		if (1 !== standard) {
			outputText += '<span>Select a Level and number of Years</span>';
		} else {
			outputText += '<span class="negative">Standard has no value</span>';
			$('div.standard').text('');
		}

		if (1 !== years) {
			outputText += '<span>Select a Level and Standard</span>';
		} else {
			outputText += '<span class="negative">Years has no value</span>';
			$('div.years').text('');
		}

		// console.log(outputText);

		// asign the calculation to the text of .output
		$('.output').text(level * standard * years);
		$('.output-text').html(outputText);


		// Scenarios: level = a, standard = b, years = c;

		// 1. a,b,c
		// 2. a,c,b

		// 3. b,a,c
		// 4. b,c,a

		// 5. c,b,a
		// 6. c,a,b

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





