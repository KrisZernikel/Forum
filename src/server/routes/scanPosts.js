const router = require('express').Router()
const { createDynamoDbClient, createScanInput, executeScan } = require('../util/scanPosts')

router.get('/', async (req, res, next) => {
    res.json(await executeScan(createDynamoDbClient('localhost'), createScanInput()))
})

module.exports = router