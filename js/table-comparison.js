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
	this.table.on('click', '.row td', function () {
		var $this = $(this),
			tdClass = $this.attr('class'),
			parent = $this.parent('tr'),
			$data = $this.data(),
			cost = 1,
			years,
			users,
			level,
			usersReduction = 1,
			yearsReduction = 1,
			yearsTrue = false,
			outputText = '',
			beforeText = 'Please select ',
			afterText = ' Required',
			quote = '',
			allSelected = false;

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
			yearsTrue = true;
		} else {
			years = 1;
		}

		// the text depending on what has been clicked on and when
		// TODO: must be a better way of writing this!


		if (1 !== level) {
			if (1 !== users && false !== yearsTrue) {
				beforeText = '',
				afterText = '';

				outputText = 'All have been selected!';
			} else if (1 !== users) {
				outputText = 'Number of Years';
			} else if (false !== yearsTrue) {
				outputText = 'users';
			} else {
				outputText = 'Number of Years and Users';
			}
		} else if (1 !== users) {
			if (1 !== level && false !== yearsTrue) {
				beforeText = '',
				afterText = '';

				outputText = 'All have been selected!';
			} else if (1 !== level) {
				outputText = 'Number of Years';
			} else if (false !== yearsTrue) {
				outputText = 'Level';
			} else {
				outputText = 'Number of Years and Level';
			}
		} else if (false !== yearsTrue) {
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

		if ('undefined' !== typeof(parent.data('reduction-users'))) {
			usersReduction = parent.data('reduction-users');
			usersReduction = AH.reductionCalc(usersReduction);
		}

		if ('undefined' !== typeof(parent.data('reduction-years'))) {
			yearsReduction = parent.data('reduction-years');
			yearsReduction = AH.reductionCalc(yearsReduction);
		}

		cost = (level * (users * usersReduction) * (years * yearsReduction));
		// output the value to the output text
		AH.output.text(cost.toFixed(0));


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

AH.reductionCalc = function (reduction) {
	return (1 - (reduction / 100));
};

AH.init();
