var mongoose = require('../libs/mongoose');
Schema = mongoose.Schema;

var Event = new Schema({
	title: {
		type: String
	},
	description : {
		type: String
	},
	text: {
		type: String
	},
	post_date: {
		type: Date,
		default: Date.now
	}
});
exports.Event = mongoose.model('Event', Event);