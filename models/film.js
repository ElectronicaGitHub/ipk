var mongoose = require('../libs/mongoose');



var film = mongoose.Schema;

var Film = new Schema({
	_id : {
		type: String,
		unique : true	
	},
	title : {
		type : String
	},
	synopsis : {
		type : String
	},
	post_date : {
		type : Date,
		default: Date.now
	}
});

exports.Film = mongoose.model('Film', Film) 