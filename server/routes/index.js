const Router = require('express')
const router = new Router()

const boardRouter = require('./boardRouter')
const taskRouter = require('./taskRouter')

router.use('/board', boardRouter)
router.use('/board', taskRouter)

module.exports = router