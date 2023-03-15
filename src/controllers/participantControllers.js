const { response } = require('express')
const Participant = require('../models/Participant')

exports.getAllParticipants = async (req, res, next) => {
	const participants = await Participant.find()

	return res.json(participants)
}

/*
exports.addNewParticipant = (req, res, next) => {
	try {
		if (!username || !email) return response.sendStatus(400)

		return response.setHeader('Location', '/participants')
	} catch (error) {
		return response.sendStatus(500)
	}
	return res.send('add new participant!')
}
*/
