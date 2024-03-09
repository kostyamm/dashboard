const { MOCK_BOARD, getMockArray, resetMockBoard } = require('../mock/mockBoard')
// const crypto = require('node:crypto');
// console.log(crypto.randomUUID())

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

module.exports = {
    clearBoard,
    initMockBoard,
    getBoard,
}