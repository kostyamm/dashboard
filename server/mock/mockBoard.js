const { mockData } = require('./mockData')

const MOCK_BOARD = new Map()

const getMockArray = () => Array.from(MOCK_BOARD.values())

const resetMockBoard = () => {
    MOCK_BOARD.clear()

    mockData.forEach((deck) => {
        MOCK_BOARD.set(deck.id, deck)
    })
}

module.exports = {
    MOCK_BOARD,
    getMockArray,
    resetMockBoard
}