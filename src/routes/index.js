const { Router } = require('express');

const routes = Router();

routes.get('/', require('../api/controllers/index').index)

routes.post('/search', require('../api/controllers/scraping').scraping)

module.exports = routes;
