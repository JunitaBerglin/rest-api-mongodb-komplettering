const mongoose = require('mongoose')

const DanceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		minLength: 2,
		maxLength: 500,
		required: true,
	},
})

module.exports = mongoose.model('Dance', DanceSchema)
