const express = require('express')

const {
	getAllParticipants,
	addNewParticipant,
	deleteParticipantFromClass,
	updateParticipantById,
} = require('../controllers/participantControllers')

const router = express.Router()

router.get('/', getAllParticipants)
router.post('/', addNewParticipant)
router.delete('/:danceClassId/:participantId', deleteParticipantFromClass)
router.put('/:participantId', updateParticipantById)

module.exports = router
