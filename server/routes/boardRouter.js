const Router = require('express')
const router = new Router()

const { getBoard, clearBoard, initMockBoard } = require('../controllers/boardController')

router.get('/', getBoard)
router.get('/clear', clearBoard)
router.get('/init_mock', initMockBoard)

module.exports = router