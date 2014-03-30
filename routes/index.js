var Event = require('../models/event').Event,
	Film = require('../models/film').Film;
	// mongoose = require('../libs/mongoose');



module.exports = function(app) {

	// главная страница
	app.get('/', function (req,res,err) {
		res.render('index');
	})

	app.get('/admin', function (req, res, err) {
		res.render('admin');
	});

	app.get('/events/last', function (req, res, next) {
		console.log('last event view');
		var last_event = Event.findOne({},{},{ 
			sort: {'post_date' : -1 } 
		}).exec(function (err, result) {
			res.json(result);
		})
	})
	app.get('/films/:type', function (req, res, next) {
		var type = (req.params.type==='all') ? {} : {'type':req.params.type};
		var films = Film.find(type, {}, { 
			sort : { $natural:-1 } 
		}).exec(function (err, result) {
			res.json(result);
		})
	})

	app.post('/admin/film', function (req, res, next) {
		var data = req.body;
		console.log(data);
		film = new Film(data);
		film.save(function (err) {
			if (err) {
				console.log(err);
			}
			console.log('Фильм сохранен');
			res.json('OK');	
		})
	})
	app.post('/admin/event', function (req, res, next) {
		var data = req.body;
		event = new Event(data);
		event.save(function (err) {
			if (err) {
				console.log(err);
			}
			console.log('Новость сохранена');
			res.json('OK');
		})
	})


}