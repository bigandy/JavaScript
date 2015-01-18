var args = process.argv,
	config = require('./config.twitter.json'),
	Twitter = require('node-twitter'),
	twitter,
	token,
	tokenSecret,
	d = new Date(),
	Tweet = {};

Tweet = {
	lessThanTenAddZero: function (value) {
		if (value <= 10) {
			return "0" + value;
		}

		return value;
	},

	tweetMessage: function (input) {
		if (input !== undefined) {
			return input + ". ";
		} else {
			return '';
		}
	},

	tweetContent: function (input) {
		var message = this.tweetMessage(args[2]);
			time = d.getHours() + ":" + this.lessThanTenAddZero(d.getMinutes()) + ":" + this.lessThanTenAddZero(d.getSeconds()),
			date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()

		tweetContent = (input) ? input + ' ' : message + "Tweeted at " + time + " on " + date + " #andrewhudsondev";
		// console.log(this.tweetMessage(tweetContent));

		return tweetContent;
	},

	twitterConfig: new Twitter.RestClient(
		config.consumerKey,
		config.consumerSecret,
		config.token,
		config.tokenSecret
	),

	sendTweet: function (input) {

		this.twitterConfig.statusesUpdate({
				status: this.tweetContent(input)
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

module.exports = Tweet;

// You could use node-passport and passport-twitter to get an access token easily
// See http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html


// Note that you can only direct message someone who follows you

