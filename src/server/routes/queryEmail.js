const router = require('express').Router()
const {
  createDynamoDbClient,
  createQueryInput,
  executeQuery
} = require('../util/queryEmail')

router.post('/', async (req, res, next) => {
  const { body } = req
  const { email } = body
  res.json(
    await executeQuery(
      createDynamoDbClient('localhost'),
      createQueryInput(email)
    )
  )
})

module.exports = router
