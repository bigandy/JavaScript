var weather = require("Openweather-Node");

weather.now("Didcot, GB",function(err, data){
    if (err) {
    	console.log(err);
    } else {
    	console.log(data.values.weather[0].main);
    	console.log(data.values);
        // console.log(data.getKelvinTemp());
        // console.log(data.getDegreeTemp());
        // console.log(data.getFahrenheitTemp());
    }
});

