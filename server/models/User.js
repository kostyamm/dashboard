const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true })

const User = model('user', userSchema)

module.exports = User