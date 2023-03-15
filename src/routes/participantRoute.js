const express = require('express')

const { getAllParticipants } = require('../controllers/participantControllers')

const router = express.Router()

router.get('/', getAllParticipants)

/*router.post('/', addNewParticipant)*/

module.exports = router
