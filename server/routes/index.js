const Router = require('express')
const router = new Router()

const { getBoard, createTask, updateTask, clearBoard, initMockBoard } = require('../controllers/boardController')

router.get('/board', getBoard)
router.get('/board/clear_board', clearBoard)
router.get('/board/init_mock_board', initMockBoard)

router.post('/board/create_task', createTask)
router.post('/board/update_task', updateTask)

module.exports = router