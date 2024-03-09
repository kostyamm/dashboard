const { MOCK_BOARD, getMockArray } = require('../mock/mockBoard')
const { TaskStatus } = require('../helpers/constants')
const crypto = require('node:crypto')

const createTask = (req, res) => {
    const { title, description, priority, due_date } = req.body

    const task = {
        id: crypto.randomUUID(),
        title,
        description,
        priority,
        due_date,
        status: TaskStatus.ToDo,
        position: 1
    }

    MOCK_BOARD.set(task.id, task)

    res.json({ data: getMockArray() })
}

const updateTask = ({ params, body }, res) => {
    MOCK_BOARD.set(params.id, body)

    res.json({ data: getMockArray() })
}

const deleteTask = ({ params }, res) => {
    MOCK_BOARD.delete(params.id)

    res.json({ data: getMockArray() })
}

const changeTaskPosition = ({ params, body }, res) => {
    res.json({ data: getMockArray() })
}

module.exports = {
    createTask,
    updateTask,
    changeTaskPosition,
    deleteTask
}