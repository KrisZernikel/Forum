const router = require('express').Router()
const {
  createDynamoDbClient,
  createPutItemInput,
  executePutItem
} = require('../util/saveUser')

router.post('/', async (req, res, next) => {
  const { email, firstName, lastName } = req.body
  try {
    await executePutItem(
      createDynamoDbClient('localhost'),
      createPutItemInput(email, firstName, lastName)
    )
  } catch (e) {
    console.log(e.message)
  }
  res.end()
})

module.exports = router
