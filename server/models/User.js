const { Schema, model } = require('mongoose')
const { baseOptions } = require('./options')

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, baseOptions)

const User = model('user', userSchema)

module.exports = User