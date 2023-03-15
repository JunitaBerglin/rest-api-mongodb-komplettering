const { response } = require('express')
const { springTerm2023 } = require('../../seedDb/springTerm2023')
const Dance = require('../models/Dance')
const Participant = require('../models/Participant')
const { BadRequestError } = require('../utils/errors')

exports.getAllParticipants = async (req, res) => {
	const limit = Number(req.query?.limit || 20)
	const offset = Number(req.query?.offset || 0)

	const participants = await Participant.find().limit(limit).skip(offset)

	if (!participants) {
		return res.status(404)
	}
	const totalParticipantsInDb = await Participant.countDocuments()

	return res.json({
		data: participants,
		meta: {
			total: totalParticipantsInDb,
			count: participants.length,
			limit: limit,
			offset: offset,
		},
	})
}

exports.addNewParticipant = async (req, res) => {
	const username = req.body.username,
	const email = req.body.email,
	const class = req.body.class,
	const role = req.body.role

	const paymentStatus = 'pending'

	let classId
	classId = await Dance.findById(class)

	if (!username || !email) return response.sendStatus(400)

	if (!role || !class) {
		throw new BadRequestError('You must enter values for each field / Du behöver fylla i alla fälten')
	}
	if (role !== 'Ledare' && role !== 'Följare') {
		return res
			.status(400)
			.json({ message: 'The role needs to be Leader or Follower / Rollen behöver vara Ledare eller Följare' })
	}

	const amountOfDifferentRoles = await Participant.countDocuments({ class: class, role: role })
	if (role == 'Följare' && amountOfDifferentRoles >= 10) {
		return res.status(400).json({ message: 'im sorry this danceclass is full / tyvärr är denna dansklass fullbokad' })
	}
	if (role == 'Ledare' && amountOfDifferentRoles >= 10) {
		return res.status(400).json({ message: 'im sorry this danceclass is full / tyvärr är denna dansklass fullbokad' })
	}

	const newParticipant = await classes.create({
		username: username,
		email: email,
		classes: classes,
		role: role,
	})

	classId.participants.push(newParticipant._id)
	classId.amountOfParticipants + 1
	await classId.save()

	return res.json(newParticipant)
}
