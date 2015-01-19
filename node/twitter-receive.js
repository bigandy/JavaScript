var config = require('./config.twitter.json'),
	Twitter = require('node-twitter'),
	fs = require('fs'),
	args = process.argv,
	Tweet = {};

Tweet = {
	twitterConfig: new Twitter.RestClient(
		config.consumerKey,
		config.consumerSecret,
		config.token,
		config.tokenSecret
	),

	twitterTimeline: function () {
		this.twitterConfig.statusesHomeTimeline({}, function(error, result) {
			if (error) {
				console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
			}

			if (result) {
				console.log(result[0].text);
				// result.forEach(function (item) {
				// 	console.log(result[item].text);
				// });

			}
		});
	},

	twitterFunctions: function () {
		this.twitterConfig.on('close', function() {
		    console.log('Connection closed.');
		});
		this.twitterConfig.on('end', function() {
		    console.log('End of Line.');
		});
		this.twitterConfig.on('error', function(error) {
		    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
		});
		this.twitterConfig.on('tweet', function(tweet) {
		    console.log(tweet);
		});

		// this.twitterConfig.start(['baseball', 'basketball', 'football', 'hockey']);
	}



};

Tweet.twitterFunctions();

module.exports = Tweet;

// You could use node-passport and passport-twitter to get an access token easily
// See http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html


// Note that you can only direct message someone who follows you

