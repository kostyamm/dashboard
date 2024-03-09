const { mockData } = require('./mockData')

const MOCK_BOARD = new Map()

const getMockArray = () => Array.from(MOCK_BOARD.values()).reverse()

const resetMockBoard = () => {
    MOCK_BOARD.clear()

    mockData.forEach((task) => {
        MOCK_BOARD.set(task.id, task)
    })
}

module.exports = {
    MOCK_BOARD,
    getMockArray,
    resetMockBoard
}