var config = require('./config.twitter.json'),
	twitterKey = config.consumerKey,
	twitterSecret = config.consumerSecret,
	token = config.token,
	secret = config.tokenSecret;

var OAuth = require('OAuth');

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitterKey,
	twitterSecret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

oauth.get(
	'https://api.twitter.com/1.1/trends/place.json?id=23424977',
	token,
	secret,
	function (error, data, response){
		if (error) console.error(error);
		// data = JSON.parse(data);
		// console.log(JSON.stringify(data, 0, 2));
		console.log(response);
});
