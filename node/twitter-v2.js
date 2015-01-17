var args = process.argv,
	config = require('./config.twitter.json'),
	Twitter = require('node-twitter'),
	twitter,
	token,
	tokenSecret,
	d = new Date();


var tweet = {
	lessThanTenAddZero: function (value) {
		if (value <= 10) {
			return "0" + value;
		} else {
			return value;
		}
	},

	tweetMessage: function (input) {
		if (input !== undefined) {
			return input + ". ";
		} else {
			return '';
		}
	},

	tweetContent: function () {
		return tweetContent = this.tweetMessage(args[2]) + "Tweeted at " + d.getHours() + ":" + this.lessThanTenAddZero(d.getMinutes()) + ":" + this.lessThanTenAddZero(d.getSeconds()) + " on " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " #andrewhudsondev";
	},

	sendTweet: function () {
		var twitter = new Twitter.RestClient(
				config.consumerKey,
				config.consumerSecret,
				config.token,
				config.tokenSecret
			);

		twitter.statusesUpdate({
				status: this.tweetContent()
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
};

tweet.sendTweet();

module.exports = tweet;



// You could use node-passport and passport-twitter to get an access token easily
// See http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html


// Note that you can only direct message someone who follows you

