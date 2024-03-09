const Router = require('express')
const router = new Router()

const { getBoard, createTask, updateTask, deleteTask, changePosition, clearBoard, initMockBoard } = require('../controllers/boardController')

router.get('/board', getBoard)
router.get('/board/clear_board', clearBoard)
router.get('/board/init_mock_board', initMockBoard)

router.post('/board/create_task', createTask)
router.post('/board/update_task', updateTask)
router.post('/board/delete_task', deleteTask)
router.post('/board/change_position', changePosition)

module.exports = router