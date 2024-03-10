const jwt = require('jsonwebtoken')
const apiError = require('../helpers/apiError')
const User = require('../models/User')

const generateJwt = (id, name) => jwt.sign({ id, name }, process.env.SECRET_KEY);

const login = async (req, res, next) => {
    const { name } = req.body

    if (!name) {
        return next(apiError.badRequest('Name is required'))
    }

    const user = await User.findOne({ name })

    if (!user) {
        return next(apiError.badRequest('User is not found'))
    }

    const token = generateJwt(user.id, user.name)

    return res.json({ token, name })
}

const verify = (req, res) => {
    const { id, name } = req.user
    const token = generateJwt(id, name)

    res.json({ token })
}

module.exports = { login, verify }