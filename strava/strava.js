var strava = require('strava-v3');


strava.athlete.get({
    'access_token': '',
},function(err,payload) {
    if(!err) {
        console.log('payload', payload);
    }
    else {
        console.log('error:', err);
    }
});
