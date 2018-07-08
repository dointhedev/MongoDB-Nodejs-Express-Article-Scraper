const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const INDEX_CONTROLLER = require('../controllers/index_controller');

/* GET home page. */
ROUTER.get('/', INDEX_CONTROLLER.index);
ROUTER.get('/saved', INDEX_CONTROLLER.saved);


module.exports = ROUTER;
