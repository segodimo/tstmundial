const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');


module.exports = (app) => {

	app.use(express.json());

	// app.use((req, res, next) => {console.log(`${req.url} - ${req.method}`); next(); });
	// app.use(morgan('dev'))
	// app.use(morgan('tiny'))
	// app.use(morgan('common'))
	app.use(morgan('combined'))


	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: false}))
}