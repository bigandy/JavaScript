// console.log(Number(process.argv[2]) + Number(process.argv[3]) + Number(process.argv[4]));

// console.log(process.argv.length);
// argLength = process.argv.length;

// for (var i = 0; i < argLength; i ++) {
// 	var output = '';

// 	if (i >= 2) {
// 		// console.log(process.argv[i]);
// 		output = output + process.argv[i];
// 		console.log(output);

// 	}
// }

process.argv.splice(0,2);
console.log(process.argv);
var output = 0;

process.argv.forEach(function(item) {
	console.log(item);
	output += Number(item);
});

console.log(output);

// for (var i = 0; i < 9; i++) {
//    console.log(i);
//    // more statements
// }

// process.argv.forEach(function(item) {
// 	console.log(item);
// });
