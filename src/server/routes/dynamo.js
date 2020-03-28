const router = require('express').Router()
const saveUserRouter = require('./saveUser')
const savePostRouter = require('./savePost')
const scanPostsRouter = require('./scanPosts')

router.use('/save-user', saveUserRouter)
router.use('/save-post', savePostRouter)
router.use('/scan-posts', scanPostsRouter)

module.exports = router