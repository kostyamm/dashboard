const Router = require('express')
const router = new Router()

const { getBoard, clearBoard, initMockBoard } = require('../controllers/boardController')

router.get('/board', getBoard)
router.get('/board/clear_board', clearBoard)
router.get('/board/init_mock_board', initMockBoard)

module.exports = router