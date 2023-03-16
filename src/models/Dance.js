const mongoose = require('mongoose')

const DanceSchema = new mongoose.Schema({
	namn: {
		type: String,
	},
	dansstil: {
		type: String,
	},
	startar: {
		type: String,
	},
	slutar: {
		type: String,
	},
	tid: {
		type: String,
	},
	klasstidIMinuter: {
		type: Number,
	},
	pris: {
		type: Number,
	},
	klassLedare: {
		type: Array,
	},
	aktivKurs: {
		type: Boolean,
	},
	participants: {
		type: [
			{
				participant: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Participant',
				},
			},
		],
	},
	amountOfParticipants: { type: Number, default: 0 },
})

module.exports = mongoose.model('Dance', DanceSchema)
