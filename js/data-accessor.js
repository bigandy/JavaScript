

'use strict';

var createPerson = function (firstName, lastName) {
	var person = {};

	// can be re written as this:
	Object.defineProperties(person, {
		firstName: {
			value: firstName
		},
		lastName: {
			value: lastName
		},
		fullName: {
			get: function () {
				return this.firstName + ' ' + this.lastName;
			},
			// configurable: true
			enumerable: true
		}
	});

	return person;
},

person = createPerson('Andrew', 'Hudson');

console.log(person.firstName); // Andrew
console.log(person.lastName); // Hudson
