var strava = require('strava-v3');
var config = require('./config.json');

strava.athlete.get({
    'access_token': config.access_token,
},function(err, payload) {
    if(!err) {
        // console.log('payload', payload);
		console.log(payload.id);
    }
    else {
        console.log('error:', err);
    }

	return payload.id;
});
