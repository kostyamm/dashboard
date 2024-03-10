const Board = require('../models/Board')
const { TaskStatus } = require('../helpers/constants')

const getBoard = async ({ user }, res) => {
    const board = await Board.where('owner').equals(user.id)

    res.json(groupBoard(board))
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