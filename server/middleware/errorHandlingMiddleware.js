const ApiError = require('../helpers/ApiError')

module.exports = (error, req, res, next) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ error })
    }

    return res.status(500).json({ message: 'Unexpected error' })
}