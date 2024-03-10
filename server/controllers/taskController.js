const Board = require('../models/Board')
const apiError = require('../helpers/apiError')
const { TaskStatus } = require('../helpers/constants')

const createTask = async (req, res) => {
    const { id: owner } = req.user

    const task = await Board.create({
        ...req.body,
        owner,
        status: TaskStatus.ToDo,
    })

    res.json(task)
}

const updateTask = async ({ params, body }, res) => {
    const updatedTask = await Board.findByIdAndUpdate(params.id, body, { new: true });

    res.json(updatedTask)
}

const deleteTask = async ({ params, user }, res, next) => {
    const task = await Board.findById(params.id)

    if (task.owner.toString() !== user.id) {
        return next(apiError.badRequest('You cannot delete someone else\'s task'))
    }

    const removedTask = await Board.findByIdAndDelete(task.id)

    res.json(removedTask)
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
}