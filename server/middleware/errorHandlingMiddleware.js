const apiError = require('../helpers/apiError')

module.exports = (error, req, res, next) => {
    if (error instanceof apiError) {
        return res.status(error.status).json({ error })
    }

    return res.status(500).json({ message: 'Unexpected error' })
}