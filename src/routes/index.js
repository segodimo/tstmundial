const { Router } = require('express');
const routes = Router();


routes.get('/', require('../api/controllers/index').index)

routes.post('/search', require('../api/controllers/scraping').scraping)

routes.post('/mlpags', require('../api/controllers/mlpags').mlpags)

module.exports = routes;
