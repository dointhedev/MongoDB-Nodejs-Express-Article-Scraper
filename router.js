module.exports = function (app) {
	const INDEX = require('./routes/index');
	const API = require('./routes/api');

	app.use('/', INDEX);
	app.use('/api', API);

}