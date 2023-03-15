const { response } = require('express')
const Dance = require('../models/Dance')

exports.getAllDanceClasses = async (req, res) => {
	const danceClasses = await Dance.find()

	return res.json(danceClasses)
}
