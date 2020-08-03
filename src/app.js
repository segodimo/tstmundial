const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');

const app = express();

app.use(express.json());

//SETTINGS
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
// app.use((req, res, next) => {console.log(`${req.url} - ${req.method}`); next(); });
// app.use(morgan('dev'))
// app.use(morgan('tiny'))
// app.use(morgan('common'))
app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//ROUTES
app.use(routes)

module.exports = app;
