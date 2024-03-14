const { Schema, model, Types } = require('mongoose')
const { baseOptions } = require('./options')

const boardSchema = new Schema({
    owner: { type: Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    due_date: { type: String, required: true },
}, baseOptions)

const Board = model('board', boardSchema)

module.exports = Board