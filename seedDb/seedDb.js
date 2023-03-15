require('dotenv').config()
const mongoose = require('mongoose')
// @ts-ignore
const springTerm2023MockData = require('./mockdata/springTerm2023.json')
// @ts-ignore
const fallTermMock2023Data = require('./mockdata/fallTerm2023.json')
const Dance = require('../src/models/Dance')
const Participant = require('../src/models/Participant.js')

const populateDbWithMockData = async (connectionString) => {
	let conn
	try {
		mongoose.set('strictQuery', false)
		conn = await mongoose.connect(
			'mongodb+srv://JunitaBerglin:losenord1@cluster0.uuzml7c.mongodb.net/?retryWrites=true&w=majority'
		)

		console.log(`MongoDB connected: ${conn.connection.host}`)

		// POPULATE DATA ACCOORDING TO YOUR MODELS
		await Dance.deleteMany()
		await Dance.create(springTerm2023MockData)
		await Dance.create(fallTermMock2023Data)

		console.log('Database successfully populated with test data')
	} catch (error) {
		console.error(error)
	} finally {
		if (conn) conn.disconnect()
		process.exit(0)
	}
}

populateDbWithMockData(process.env.MONGO_URI)
