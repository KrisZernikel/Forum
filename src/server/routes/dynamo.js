const router = require('express').Router()
const saveUserRouter = require('./saveUser')
const savePostRouter = require('./savePost')
const scanPostsRouter = require('./scanPosts')
const queryEmailRouter = require('./queryEmail')
const deletePostRouter = require('./deletePost')

router.use('/save-user', saveUserRouter)
router.use('/save-post', savePostRouter)
router.use('/scan-posts', scanPostsRouter)
router.use('/query-email', queryEmailRouter)
router.use('/delete-post', deletePostRouter)

module.exports = router
