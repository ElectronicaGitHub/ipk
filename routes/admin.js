var Event = require('../models/event').Event,
	Film = require('../models/film').Film,
	passport = require('passport');

module.exports = function (app, config) {

	// app.use(function(req, res, next) {
	//     var auth;
	//     console.log('middleware just in admin view');
	//     if (req.headers.authorization) {
	//       auth = new Buffer(req.headers.authorization.substring(6), 'base64')
	//         .toString()
	//         .split(':');
	//     }
	//     if (!auth || 
	//          auth[0] !== config.get('autentification:username') || 
	//          auth[1] !== config.get('autentification:password')
	//         ) {
	//         res.statusCode = 401;
	//         res.setHeader('WWW-Authenticate', 'Basic realm="Server God asks for your password sick hacker!!! Tell him!"');
	//         res.render('index')
	//     } else {
	//         next();
	//     }
	// });

	app.get('/admin_admin', function (req, res, next) {
		var data = {};
		var el = {};
		if (Object.keys(req.query).length > 0) {
			if (req.query.type==='film') {
				el = Film.find({_id : req.query.id })
				data = {
					type : 'film'
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
					console.log('data.data', data.data)
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

	app.get('/admin_admin/list', function (req, res, err) {
		res.render('admin_panel');
	})
}