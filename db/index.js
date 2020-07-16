const mongoose = require('mongoose')
const config = require('./config.json')

// Use native promises
mongoose.Promise = global.Promise

const { user, host, port, name } = config.db
const connectionURL = `mongodb://${host}:${port}/${name}`

const logError = err => console.error(err)

mongoose
  .connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .catch(logError)
const db = mongoose.connection

// Check connection
db.on('connected', () => {
  console.log(`Mongoose connection open on ${connectionURL}`)
})

// Check for DB errors
db.on('error', logError)

// Check for disconnected
db.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed throw app termination')
    process.exit(0)
  })
})
