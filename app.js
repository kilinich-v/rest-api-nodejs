const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/contactsRoute')
const usersRoute = require('./routes/usersRoute')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static('public'))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRoute)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message })
})

module.exports = app
