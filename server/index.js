require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 8000

const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)


// Mongo setup
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log(err))

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server started on port ${PORT}`)
})
