/* global console */
'use strict';

var Person = function (config) {
    this.firstName = config.name;
    this.lastName = config.lastName;
    this.age = config.age;
};

Person.prototype.work = function () {
    return this.firstName  + ' is working';
};


var Andrew = new Person({
    name: "Andrew",
    lastName: "Hudson",
    age: "33"
});

console.log(Andrew.work(), Andrew.age, Andrew.lastName);
