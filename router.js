module.exports = function (app) {
	const INDEX = require('./routes/index');
	app.use('/', INDEX);

}