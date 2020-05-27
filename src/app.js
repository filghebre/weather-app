const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');


const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Filmon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Filmon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Filmon',
        message: 'what can I help you?'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'No address provided!'
        })
    }
        geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                // return console.log(error);
               return res.send({
                    error: error
                })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
               
                if(error) {
                    // return console.log(error);
                    return res.send({
                        error // used shorthand of error: error
                    })
                }
    
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })

            })
        })
})


app.get('/help/*', (req, res) => {
    res.render('oops', {
        title: 'error',
        name: 'Filmon',
        message: 'Help article you requested '
    })
})

app.get('*', (req, res) => {
    res.render('oops', {
        title: '404',
        name: 'Filmon',
        message: 'requested page '
    })
})

app.listen(3000, () => {
    console.log('app just started');
})
