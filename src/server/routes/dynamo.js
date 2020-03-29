const router = require('express').Router()
const saveUserRouter = require('./saveUser')
const savePostRouter = require('./savePost')
const scanPostsRouter = require('./scanPosts')
const queryEmailRouter = require('./queryEmail')

router.use('/save-user', saveUserRouter)
router.use('/save-post', savePostRouter)
router.use('/scan-posts', scanPostsRouter)
router.use('/query-email', queryEmailRouter)

module.exports = router