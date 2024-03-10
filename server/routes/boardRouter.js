const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const { getBoard } = require('../controllers/boardController')

router.get('/', authMiddleware, getBoard)

module.exports = router