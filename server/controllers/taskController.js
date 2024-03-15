const Board = require('../models/Board')
const ApiError = require('../helpers/ApiError')
const { TaskStatus } = require('../helpers/constants')

const createTask = async (req, res, next) => {
    const { id: owner } = req.user

    const amountToDoTasks = await Board.where({ owner, status: TaskStatus.ToDo }).countDocuments()
    const amountTasks = await Board.where({ owner }).countDocuments()

    if (amountToDoTasks >= 5) {
        return next(ApiError.badRequest('You cannot create more than 5 tasks for to_do status'))
    }

    if (amountTasks >= 20) {
        return next(ApiError.badRequest('You cannot create more than 20 tasks for one board'))
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

const getTask = async ({ params, body }, res, next) => {
    try {
        const response = await Board.findById(params.id);

        res.json(response)
    } catch {
        return next(ApiError.badRequest('Some problems getting the task'))
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
    getTask,
    updateTask,
    deleteTask,
}