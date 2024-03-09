const Router = require('express')
const router = new Router()

const { createTask, updateTask, deleteTask, changeTaskPosition } = require('../controllers/taskController')

router.post('/task', createTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)
router.post('/task/:id/change_position', changeTaskPosition)

module.exports = router