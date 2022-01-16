const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (errorForecast, forecastData) => {
                if (errorForecast) {
                    return res.send({ errorForecast });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
