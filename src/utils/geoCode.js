const request = require("request");

// const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/asmara.json?access_token=pk.eyJ1IjoiZmlsZ2hlYiIsImEiOiJja2FrY21wbGQwbnd5MnduNmV4eDR5eWJ4In0.68zR1F1aLuvwB03wMCHXpw&query=37.8267,-122.4233&limit=1';


// request({ url: geoUrl, json: true }, (error, response) => {
    // if(error) {
    //     console.log('Unable to get to weather service!');
    // } else if (response.body.features.length === 0) {
    //     console.log('Unable to find the requested data!');
    // } else {
    //     const data = response.body.features;
    //     data.forEach(element => {
    //         console.log(`The latitude is: ${element.geometry.coordinates[1]}, and the longitude is ${element.geometry.coordinates[0]}`)
    //     });    
    //     // console.log(response.body.features[0].geometry.coordinates[0]) // could have worked too.
    // }
// })


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZmlsZ2hlYiIsImEiOiJja2FrY21wbGQwbnd5MnduNmV4eDR5eWJ4In0.68zR1F1aLuvwB03wMCHXpw&query=37.8267,-122.4233&limit=1';

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to get to weather service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find the requested data!', undefined);
        } else {   
            callback(undefined, {
                location: body.query,
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
            }) 
        }
    })
}

module.exports = geoCode;