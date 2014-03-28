var Event = require('../models/event').Event,
	Film = require('../models/film').Film;


module.exports = function(app) {

	// главная страница
	app.get('/', function (req,res,err) {
		res.render('index');
	})


}