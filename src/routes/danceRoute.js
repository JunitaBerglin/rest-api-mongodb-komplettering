const express = require('express')
const { getAllDanceClasses } = require('../controllers/danceControllers')

const router = express.Router()

router.get('/', getAllDanceClasses)

module.exports = router
