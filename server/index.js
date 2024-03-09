const express = require('express')
const cors = require('cors')

const PORT = 4040

const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server started on port ${PORT}`)
})
