const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ApiError = require('../helpers/ApiError')
const User = require('../models/User')

const generateJwt = (payload) => {
    const options = { expiresIn: '24h' }

    return jwt.sign(payload, process.env.SECRET_KEY, options)
};

const registration = async (req, res, next) => {
    const { name, surname, email , password } = req.body

    if (!name || !surname || !email || !password) {
        return next(ApiError.badRequest('All fields are required'))
    }

    const candidate = await User.findOne({ email })

    if (candidate) {
        return next(ApiError.badRequest('This user already exists'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ ...req.body, password: hashPassword })

    const tokenData = { id: user.id, name, surname, email }
    const token = generateJwt(tokenData)

    return res.json({...tokenData, token})
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(ApiError.badRequest('Email and Password are required'))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(ApiError.badRequest('User is not found'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
        return next(ApiError.badRequest('Email or Password is not correct'))
    }

    const tokenData = { id: user.id, name: user.name, surname: user.surname, email }
    const token = generateJwt(tokenData)

    return res.json({...tokenData, token})
}

const verify = (req, res) => {
    const { id, name, surname, email } = req.user

    const tokenData = { id, name, surname, email }
    const token = generateJwt(tokenData)

    res.json({ ...tokenData, token })
}

module.exports = { login, registration, verify }