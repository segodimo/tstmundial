const { Router } = require('express');
const routes = Router();


// routes.get('/', require('../api/controllers/index').index)

routes.post('/scraping', require('../api/controllers/scraping').scraping)

routes.post('/mlpags', require('../api/controllers/mlpags').mlpags)

routes.get('/mlthread', require('../api/controllers/mlthread').mlthread)

routes.post('/mlthread', require('../api/controllers/mlthread').mlthread)


module.exports = routes;