const { Schema, model } = require('mongoose')
const { baseOptions } = require('./options')

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
}, baseOptions)

const User = model('user', userSchema)

module.exports = User