const router = require('express').Router()
const {
  createDynamoDbClient,
  createScanInput,
  executeScan
} = require('../util/scanPosts')

router.get('/', async (req, res, next) => {
  const scanPosts = await executeScan(
    createDynamoDbClient('localhost'),
    createScanInput()
  )
  scanPosts.Items.reverse()
  res.json(scanPosts)
})

module.exports = router
