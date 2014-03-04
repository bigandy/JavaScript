'use strict';

var createPerson = function (firstName, lastName) {
	var person = {};

	// Object.defineProperty(person, "firstName", {
	// 	value: firstName,
	// 	writable: false // set this to false or omit to disable writability
	// });

	// Object.defineProperty(person, "lastName", {
	// 	value: lastName,
	// 	writable: false // set this to false or omit to disable writability
	// });


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
				return this.firstName + " " + this.lastName;
			},
			// configurable: true
			enumerable: true
		}
	});

	return person;
},

person = createPerson("Andrew", "Hudson");

console.log(person.firstName); // Andrew
console.log(person.lastName); // Hudson

// if I wanted to change one of these values I couldn't because writable is set to false
// e.g.
// person.lastName = "Goaty";// chrome errors and says cannot assign to read only property lastName.
// console.log(person.lastName);
