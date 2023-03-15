require('dotenv').config()
const mongoose = require('mongoose')
// @ts-ignore
const springTerm2023 = require('./springTerm2023')
// @ts-ignore
const fallTerm2023 = require('./fallTerm2023')
const Dance = require('../src/models/Dance')
const Participant = require('../src/models/Participant.js')

const populateDbWithMockData = async (connectionString) => {
	let conn
	try {
		mongoose.set('strictQuery', false)
		conn = await mongoose.connect(connectionString)

		console.log(`MongoDB connected: ${conn.connection.host}`)

		// POPULATE DATA ACCOORDING TO YOUR MODELS
		await Dance.deleteMany()
		await Dance.create(springTerm2023.springTerm2023)
		await Dance.create(fallTerm2023.fallTerm2023)

		console.log('Database successfully populated with test data')
	} catch (error) {
		console.error(error)
	} finally {
		if (conn) conn.disconnect()
		process.exit(0)
	}
}

populateDbWithMockData(process.env.MONGO_URI)
