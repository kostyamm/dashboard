const Board = require('../models/Board')
const ApiError = require('../helpers/ApiError')
const { TaskStatus } = require('../helpers/constants')

const createTask = async (req, res, next) => {
    const { id: owner } = req.user

    const amountTasks = await Board.where({ owner, status: TaskStatus.ToDo }).countDocuments()

    if (amountTasks >= 5) {
        return next(ApiError.badRequest('You can not create more than 5 tasks for to_do status'))
    }

    try {
        const response = await Board.create({
            ...req.body,
            owner,
            status: TaskStatus.ToDo,
        })

        res.json(response)
    } catch {
        return next(ApiError.badRequest('Form validation error'))
    }
}

const updateTask = async ({ params, body }, res, next) => {
    try {
        const response = await Board.findByIdAndUpdate(params.id, body, { new: true });

        res.json(response)
    } catch {
        return next(ApiError.badRequest('Form validation error'))
    }
}

const deleteTask = async ({ params, user }, res, next) => {
    const task = await Board.findById(params.id)

    if (task.owner.toString() !== user.id) {
        return next(ApiError.badRequest('You cannot delete someone else\'s task'))
    }

    try {
        const response = await Board.findByIdAndDelete(task.id)

        res.json(response)
    } catch {
        return next(ApiError.badRequest('Some problems with deleting a task'))
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
}