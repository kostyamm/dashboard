const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const { login, registration, verify } = require('../controllers/userContreller')

router.post('/login', login)
router.post('/registration', registration)
router.get('/verify', authMiddleware, verify)

module.exports = router