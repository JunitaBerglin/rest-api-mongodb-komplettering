require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const participantRoute = require('./routes/participantRoute')
const danceRoute = require('./routes/danceRoute')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
	console.log(`Processing ${req.method} request to ${req.path}`)
	next()
})

app.use('/api/v1/danceclasses', danceRoute)
app.use('/api/v1/participants', participantRoute)

const port = 5001
const run = async () => {
	try {
		mongoose.set('strictQuery', false)
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB connected: ${conn.connection.host}`)

		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`)
		})
	} catch (error) {
		console.error(error)
	}
}

run()
