const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f4b3edcb1042bad04374bcc949b2dfbc&query=' + longitude + ',' + latitude + '&units=f';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect', undefined);
        } else if(body.error) {
            callback('service site is not responding', undefined);
        } else {
            callback(undefined, {

                currentWeather: `Current weather is ${body.current.weather_descriptions[0]}, temperature of ${body.current.temperature} and it feels like ${body.current.feelslike}.`
                // weather: body.current.weather_descriptions[0], 
                // temperature: body.current.temperature, 
                // feelsLike: body.current.feelslike,
            })
        }
    })
}


module.exports = forecast;