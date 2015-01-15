(function () {
	"use strict";

	function lessThanTenAddZero (value) {
		if (value <= 10) {
			return "0" + value;
		} else {
			return value;
		}
	}

	function tweetMessage (input) {
		if (input !== undefined) {
			return input;
		} else {
		return city;
		}
	}

	var	args = process.argv,
		config = require('./config.twitter.json'),
		Twitter = require('node-twitter'),
		twitter,
		token,
		tokenSecret,
		d = new Date(),
		weatherCondtions,
		city = "Didcot",
		url = 'http://openweathermap.org/find?q=' + tweetMessage(args[2]).split(' ').join('+'),
		weather = require("Openweather-Node");

	weather.now(tweetMessage(args[2]), function(err, data){
	    if (err) {
	    	console.log(err);
	    } else {
	    	weatherCondtions = data.values.weather[0].main;
	    	// console.log(data.getDegreeTemp().temp.toFixed(2));

	    	var tweetContent = d.getHours() + ":" + lessThanTenAddZero(d.getMinutes()) + ":" + lessThanTenAddZero(d.getSeconds()) + " & the weather in " + tweetMessage(args[2]) + " is: " + weatherCondtions + " & " + data.getDegreeTemp().temp.toFixed(2) + "°C #nodejs #weather " + url;

	    	// You could use node-passport and passport-twitter to get an access token easily
	    	// See http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html
	    	twitter = new Twitter.RestClient(
	    		config.consumerKey,
	    		config.consumerSecret,
	    		config.token,
	    		config.tokenSecret
	    	);

	    	// Note that you can only direct message someone who follows you
	    	twitter.statusesUpdate({
	    			status: tweetContent
	    			//, in_reply_to_status_id: 357237590082072576
	    		},
	    		function (err, data) {
	    			if (err) {
	    				console.error(err);
	    			} else {
	    				console.log('success! : ' + tweetContent);
	    			}
	    		}
	    	);
	    }
	    return weatherCondtions;
	});
}());
