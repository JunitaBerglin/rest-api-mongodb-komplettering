const express = require('express')

const { getAllParticipants, addNewParticipant } = require('../controllers/participantControllers')

const router = express.Router()

router.get('/', getAllParticipants)
router.post('/', addNewParticipant)

module.exports = router
