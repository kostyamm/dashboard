const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const { createTask, updateTask, deleteTask } = require('../controllers/taskController')

router.post('/task', authMiddleware, createTask)
router.put('/task/:id', authMiddleware, updateTask)
router.delete('/task/:id', authMiddleware, deleteTask)

module.exports = router