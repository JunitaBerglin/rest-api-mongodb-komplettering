const { response } = require('express')
const Dance = require('../models/Dance')
const { NotFoundError } = require('../utils/errors')

exports.getAllDanceClasses = async (req, res) => {
	try {
		const danceClasses = await Dance.find()

		if (!danceClasses) {
			throw new NotFoundError('There are no danceclasses / det finns inga dansklasser')
		}

		res.json(danceClasses)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}
