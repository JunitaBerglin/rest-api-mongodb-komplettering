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
	class: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	paymentStatus: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Participant', ParticipantSchema)
