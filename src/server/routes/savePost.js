const router = require('express').Router()
const { createDynamoDbClient, createPutItemInput, executePutItem } = require('../util/savePost')

router.post('/', async (req, res, next) => {
    const { email, post } = req.body
    try {
    await executePutItem(createDynamoDbClient('localhost'), createPutItemInput(email, post, String(new Date().getTime())))
    } catch (e) {
        console.log(e.message)
    }
    res.end()
})

module.exports = router