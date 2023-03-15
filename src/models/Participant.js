const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	zipcode: {
		type: Number,
	},
	description: {
		type: String,
		minLength: 20,
		maxLength: 200,
	},
	payment: {
		type: Boolean,
		required: true,
	},
})

module.exports = mongoose.model('Participant', ParticipantSchema)
