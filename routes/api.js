const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const API_CONTROLLER = require('../controllers/api_controller');


ROUTER.get('/fetch', API_CONTROLLER.fetch);
ROUTER.get('/headlines', API_CONTROLLER.headlines);


module.exports = ROUTER;
