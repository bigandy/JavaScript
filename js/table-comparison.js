/* global AH, $, window */
'use strict';
window.AH = {};

AH.init = function () {
	this.table = $('#table');
	AH.cellClick();

	this.outputRow = $('<tr />', {
		class: 'outputRow'
	});

	this.output = $('<td colspan="12" />', {
		class: 'output'
	})

	this.outputRow.append(this.output);

	// this.table.append(this.outputRow);
};

AH.cellClick = function () {
	this.table.on('click', 'td', function () {
		var $this = $(this),
			tdClass = $this.attr('class'),
			parent = $this.parent('tr'),
			cost,
			years,
			users,
			level,
			usersReduction = 1,
			yearsReduction = 1,
			yearsTrue,
			outputText = '',
			beforeText = 'Please select ',
			afterText = ' Required',
			quote = '';


		// if you click on the element with parent that doesn't have class tr--active, highlight that row
		if (false === AH.checkRow(parent)) {
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

		if ('undefined' !== typeof(parent.data('users'))) {
			users = parent.data('users');
		} else {
			users = 1;
		}

		if ('undefined' !== typeof(parent.data('years'))) {
			years = parent.data('years');
		} else {
			years = 1;
		}

		// the text depending on what has been clicked on and when
		// TODO: must be a better way of writing this!


		if (1 !== level) {
			if (1 !== users && 1 !== years) {
				beforeText = '',
				afterText = '';

				outputText = 'All have been selected!';
			} else if (1 !== users) {
				outputText = 'Number of Years';
			} else if (1 !== years) {
				outputText = 'users';
			} else {
				outputText = 'Number of Years and Users';
			}
		} else if (1 !== users) {
			if (1 !== level && 1 !== years) {
				beforeText = '',
				afterText = '';

				outputText = 'All have been selected!';
			} else if (1 !== level) {
				outputText = 'Number of Years';
			} else if (1 !== years) {
				outputText = 'Level';
			} else {
				outputText = 'Number of Years and Level';
			}
		} else if (1 !== years) {
			if (1 !== users && 1 !== level) {
				beforeText = '',
				afterText = '';

				outputText = 'All have been selected!';
			} else if (1 !== users) {
				outputText = 'users + years';
			} else if (1 !== level) {
				outputText = 'level + years';
			} else {
				outputText = 'Level and Users';
			}
		}

		cost = (level * (users * usersReduction) * (years * yearsReduction));

		// asign the calculation to the text of .output
		AH.output.text(level * users * years);
		$('.output-text').html(beforeText + outputText + afterText);
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
	el.addClass('tr--active').after(AH.outputRow);
};

AH.checkRow = function (el) {
	if (el.hasClass('tr--active')) {
		return true;
	} else {
		return false;
	}
};

AH.init();
