const express = require('express');
const consign = require('consign');
const winston = require('winston');
const uuidv4 = require('uuidv4');
const routes = require('./routes');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);


app.log = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({ format: winston.format.json({ space: 1 }) }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'warn',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json({ space: 1 })),
    }),
  ],
});

consign({cwd: 'src', verbose: false })
	//MIDDLEWARES
	.include('./config/middlewares.js')
	.into(app);


app.get('/', (req, res) => {
  app.log.debug('Use /mlpags o /mlthreads enviando o JSON via post');
  res.status(200).send();
});

// //ROUTES
app.use(routes)

module.exports = app;
