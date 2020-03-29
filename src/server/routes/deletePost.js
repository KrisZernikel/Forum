const router = require('express').Router()
const {
  createDynamoDbClient,
  createDeleteItemInput,
  executeDeleteItem
} = require('../util/deletePost')

router.post('/', async (req, res, next) => {
  const { Email, TimeStamp } = req.body
  try {
    await executeDeleteItem(
      createDynamoDbClient('localhost'),
      createDeleteItemInput(Email, TimeStamp)
    )
  } catch (e) {
    console.log(e.message)
  }
  res.end()
})

module.exports = router
