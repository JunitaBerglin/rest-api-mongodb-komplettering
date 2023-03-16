const { response } = require('express')
const { springTerm2023 } = require('../../seedDb/springTerm2023')
const Dance = require('../models/Dance')
const Participant = require('../models/Participant')
const { BadRequestError, NotFoundError } = require('../utils/errors')

exports.getAllParticipants = async (req, res) => {
	try {
		const limit = Number(req.query?.limit || 20)
		const offset = Number(req.query?.offset || 0)

		const participants = await Participant.find().limit(limit).skip(offset)

		if (!participants) {
			return res.status(404)
		}
		const totalParticipantsInDb = await Participant.countDocuments()

		res.json({
			data: participants,
			meta: {
				total: totalParticipantsInDb,
				count: participants.length,
				limit: limit,
				offset: offset,
			},
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}

exports.addNewParticipant = async (req, res) => {
	try {
		const username = req.body.username
		const email = req.body.email
		const danceClass = req.body.danceClass
		const role = req.body.role

		const paymentStatus = 'pending'

		let danceClassId
		danceClassId = await Dance.findById(danceClass)

		console.log(danceClassId)

		if (!username || !email) return response.sendStatus(400)

		if (!role || !danceClass) {
			throw new BadRequestError('You must enter values for each field / Du behöver fylla i alla fälten')
		}
		if (role !== 'Ledare' && role !== 'Följare') {
			return res
				.status(400)
				.json({ message: 'The role needs to be Leader or Follower / Rollen behöver vara Ledare eller Följare' })
		}

		const amountOfDifferentRoles = await Participant.countDocuments({ danceClass: danceClass, role: role })
		if (role == 'Följare' && amountOfDifferentRoles >= 10) {
			return res.status(400).json({ message: 'im sorry this danceClass is full / tyvärr är denna dansklass fullbokad' })
		}
		if (role == 'Ledare' && amountOfDifferentRoles >= 10) {
			return res.status(400).json({ message: 'im sorry this danceClass is full / tyvärr är denna dansklass fullbokad' })
		}

		const newParticipant = await Participant.create({
			username: username,
			email: email,
			danceClass: danceClass,
			role: role,
		})

		danceClassId.participants.push(newParticipant.id)

		Dance.updateOne({ danceClassId })
		danceClassId.update({ amountOfParticipants: (danceClassId.amountOfParticipants += 1) })
		await danceClassId.save()

		res.json(newParticipant)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}

exports.deleteParticipantFromClass = async (req, res) => {
	try {
		const danceClassId = req.params.danceClassId
		const participantId = req.params.participantId

		if (!danceClassId || !participantId) {
			throw new BadRequestError(
				'You must enter participantId and danceclassId / Du behöver fylla i deltagarId och dansklassId'
			)
		}

		let danceClasstoUpdate = await Dance.findById(danceClassId)
		if (!danceClasstoUpdate) {
			return res.status(404).json({ message: 'danceclass doenst exist / dansklassen existerar inte' })
		}

		const participantInClass = danceClasstoUpdate.participants.find(({ participant }) => participant == participantId)

		let participantToDelete = await Participant.findById(participantId)

		let index = danceClasstoUpdate.participants.indexOf(participantInClass)

		danceClasstoUpdate.participants.splice(index, 1)
		const updatedDanceClass = await danceClasstoUpdate.save()
		return res.json(updatedDanceClass)
	} catch (error) {
		console.error(error)
		if (error instanceof NotFoundError || error instanceof BadRequestError) {
			return res.status(error).json({ message: error.message })
		}
		return res.status(500).json({ message: error.message })
	}
}

exports.updateParticipantById = async (req, res) => {
	try {
		const email = req.body.email
		const paymentStatus = req.body.paymentStatus

		const participantId = req.params.participantId

		if (!participantId) {
			throw new BadRequestError('You must enter participantId / Du behöver fylla i deltagarId')
		}

		const participantToUpdate = await Participant.findById(participantId)

		if (!participantToUpdate) {
			throw new NotFoundError('Participant not found / deltagaren hittades ej')
		}

		if (email) {
			participantToUpdate.email = email
		}

		if (paymentStatus == 'pending') {
			participantToUpdate.paymentStatus = paymentStatus
		}
		if (paymentStatus == 'paid') {
			participantToUpdate.paymentStatus = paymentStatus
		} else {
			return res
				.status(400)
				.json({ message: 'paymentStatus must be paid or pending / betalningsstatus behöver vara betald eller väntande' })
		}

		const updatedParticipant = await participantToUpdate.save()
		return res.json(updatedParticipant)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}
