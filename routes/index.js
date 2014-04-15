var Event = require('../models/event').Event,
	Film = require('../models/film').Film,
	passport = require('passport');

	// mongoose = require('../libs/mongoose');



module.exports = function(app) {

	// главная страница
	app.get('/', function (req,res,err) {
		console.log(req.user)
		if (req.user) {
			console.log(req.user);
		}
		res.render('index');
	});

	app.get('/films', function (req ,res, err) {
		res.render('films');
	});

	app.get('/services', function (req ,res, err) {
		res.render('services');
	});

	app.get('/company', function (req ,res, err) {
		res.render('about');
	});

	app.get('/contacts', function (req ,res, err) {
		res.render('contacts');
	});

	app.get('/admin', function (req, res, next) {
		var data = {};
		var el = {};
		if (Object.keys(req.query).length>0) {
			if (req.query.type==='film') {
				el = Film.find({_id : req.query.id })
				data = {
					type	 : 'film'
				};
			};
			if (req.query.type==='event') {
				el = Event.find({_id : req.query.id });
				data = {
					type : 'event'
				};
			};
			if (el) {
				el.exec(function(err, result) {
					if (err) return next(err);
					data.data = result[0];
					console.log('data = ', data);
					res.render('admin', {data : data});
					
				})
			}
		} else {
			res.render('admin', {
				data : {}
			})
		}
	});

	app.get('/admin/list', function (req, res, err) {
		res.render('admin_panel');
	})

	app.get('/events/last', function (req, res, next) {
		console.log('last event view');
		var last_event = Event.findOne({},{},{ 
			sort: {'post_date' : -1 } 
		}).exec(function (err, result) {
			if (result) {
				res.json(result);
			} else res.json(undefined)
		})
	})
	app.get('/events/all', function (req, res, next) {
		Event.find({}, function (err, result) {
			res.json(result);
		});
	})
	app.get('/films/:type', function (req, res, next) {
		var type = (req.params.type==='all') ? {} : {'type':req.params.type};
		var films = Film.find(type, {}, { 
			sort : { $natural:-1 } 
		}).exec(function (err, result) {
			res.json(result);
		})
	})

	app.post('/admin/:type', function (req, res, next) {
		console.log('save view');
		var data = req.body;
		console.log(data);
		if (req.params.type === 'film') {
			film = new Film(data);
			film.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Фильм сохранен');
				res.json('OK');	
			})
		} else {
			event = new Event(data);
			event.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Новость сохранена');
				res.json('OK');
			})
		}
	})

	app.post('/admin/:type/update', function (req, res, next) {
		var id = req.body._id;
		var commonData = req.body; 
		delete(commonData['_id']);
		delete(commonData['__v']);
		console.log(req.body);
		console.log(id);
		if (req.params.type === 'film') {
			Film.update({_id: id}, commonData, { multi: false}, function (err, numberAffected, raw) {
				if (err) return next(err);
				console.log('Film updated');
				console.log('The number of updated documents was %d', numberAffected);
  				console.log('The raw response from Mongo was ', raw);
				res.send('OK');
			})
		} else {
			Event.update({_id: req.body._id}, commonData, { multi: false}, function (err, numberAffected, raw) {
				if (err) return next(err);
				console.log('Event updated');
				console.log('The number of updated documents was %d', numberAffected);
  				console.log('The raw response from Mongo was ', raw);
				res.send('OK');
			})
		}
	})

	app.delete('/admin/:type/:id', function (req, res, next) {
		console.log('delete view for' + req.params.type);
		if (req.params.type === 'film') {
			Film.findOneAndRemove({_id : req.params.id}, {}, function (err, result) {
				if (err) return next(err);
				console.log(result);
				res.end('film deleted')
			})
		} else {
			Event.findOneAndRemove({_id : req.params.id}, {}, function (err, result) {
				if (err) return next(err);
				console.log(result);
				res.end('event deleted')
			})
		}
	})
}