var mongoose = require('../libs/mongoose');
Schema = mongoose.Schema;

var Film = new Schema({
	title : {
		type : String
	},
	synopsis : {
		type : String
	},
	film_url : {
		type: String
	},
	type : {
		type: String
	},
	picture_url : {
		type : String
	},
	post_date : {
		type : Date,
		default: Date.now
	}
});

exports.Film = mongoose.model('Film', Film) 