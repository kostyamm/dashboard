const { MOCK_BOARD, getMockArray, resetMockBoard } = require('../mock/mockBoard')
const { TaskStatus } = require('./constants')
const crypto = require('node:crypto')

const clearBoard = (req, res) => {
    MOCK_BOARD.clear()

    res.json({ data: [] })
}

const initMockBoard = (req, res) => {
    resetMockBoard()

    res.json({ data: getMockArray() })
}

const getBoard = (req, res) => {
    res.json({ data: getMockArray() })
}

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

const updateTask = (req, res) => {
    const task = req.body
    MOCK_BOARD.set(task.id, task)

    res.json({ data: getMockArray() })
}

module.exports = {
    clearBoard,
    initMockBoard,
    getBoard,
    createTask,
    updateTask
}