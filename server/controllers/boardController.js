const Board = require('../models/Board')
const { TaskStatus } = require('../helpers/constants')
const apiError = require('../helpers/apiError')

const getBoard = async ({ user }, res, next) => {
    try {
        const board = await Board.where('owner').equals(user.id)

        res.json(groupBoard(board))
    } catch {
        return next(apiError.badRequest('Some problems getting the board'))
    }
}

module.exports = {
    getBoard,
}

const groupBoard = (data) => {
    return data.reduce((res, currentValue) => {
        const tasksByStatus = res[currentValue.status];
        res[currentValue.status] = [...tasksByStatus, currentValue];

        return res;

    }, {
        [TaskStatus.ToDo]: [],
        [TaskStatus.InProgress]: [],
        [TaskStatus.Done]: [],
        [TaskStatus.Cancelled]: [],
    });
};