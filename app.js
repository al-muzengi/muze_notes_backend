const {url} = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./controllers/notes')
const {errorHandler} = require('./utils/middleware')

mongoose.connect(url).then(() => {
  console.log(`Connected to the database`)
})
.catch((error) => {
  console.log(`Error: ${error.message}`)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/notes',router)

app.use(errorHandler)
module.exports = app