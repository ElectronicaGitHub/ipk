var mongoose = require('../libs/mongoose');
Schema = mongoose.Schema;

var Event = new Schema({
	_id: {
		type: String,
		unique: true
	},
	title: {
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