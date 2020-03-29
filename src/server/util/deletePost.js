// ------------ NodeJS runtime ---------------
// Add aws-sdk in package.json as a dependency
// Example:
// {
//     "dependencies": {
//         "aws-sdk": "^2.0.9",
//     }
// }
// Create your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users)
// Format of the above file should be:
//  [default]
//  aws_access_key_id = YOUR_ACCESS_KEY_ID
//  aws_secret_access_key = YOUR_SECRET_ACCESS_KEY

const AWS = require('aws-sdk')

function createDynamoDbClient (regionName) {
  // Set the region
  // AWS.config.update({region: regionName});
  // Use the following config instead when using DynamoDB Local
  AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'k5gf2o',
    secretAccessKey: 'asfxb7'
  })
  return new AWS.DynamoDB()
}

function createDeleteItemInput (Email, PostId) {
  return {
    TableName: 'Post',
    Key: {
      Email: {
        S: Email
      },
      PostId: {
        S: PostId
      }
    }
  }
}

async function executeDeleteItem (dynamoDbClient, deleteItemInput) {
  // Call DynamoDB's deleteItem API
  try {
    const deleteItemOutput = await dynamoDbClient
      .deleteItem(deleteItemInput)
      .promise()
    console.info('Successfully deleted item.')
    // Handle deleteItemOutput
  } catch (err) {
    handleDeleteItemError(err)
  }
}

// Handles errors during DeleteItem execution. Use recommendations in error messages below to
// add error handling specific to your application use-case.
function handleDeleteItemError (err) {
  if (!err) {
    console.error('Encountered error object was empty')
    return
  }
  if (!err.code) {
    console.error(
      `An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(
        err
      )}`
    )
    return
  }
  switch (err.code) {
    case 'ConditionalCheckFailedException':
      console.error(
        `Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`
      )
      return
    case 'TransactionConflictException':
      console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
       'with exponential back-off. Error: ${err.message}`)
      return
    case 'ItemCollectionSizeLimitExceededException':
      console.error(
        `An item collection is too large, you're using Local Secondary Index and exceeded size limit of` +
          `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`
      )
      return
    default:
      break
    // Common DynamoDB API errors are handled below
  }
  handleCommonErrors(err)
}

function handleCommonErrors (err) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(
        `Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`
      )
      return
    case 'ProvisionedThroughputExceededException':
      console.error(
        `Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off.` +
          `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
      )
      return
    case 'ResourceNotFoundException':
      console.error(
        `One of the tables was not found, verify table exists before retrying. Error: ${err.message}`
      )
      return
    case 'ServiceUnavailable':
      console.error(
        `Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
      )
      return
    case 'ThrottlingException':
      console.error(
        `Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
      )
      return
    case 'UnrecognizedClientException':
      console.error(
        `The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying.` +
          `Error: ${err.message}`
      )
      return
    case 'ValidationException':
      console.error(
        `The input fails to satisfy the constraints specified by DynamoDB, ` +
          `fix input before retrying. Error: ${err.message}`
      )
      return
    case 'RequestLimitExceeded':
      console.error(
        `Throughput exceeds the current throughput limit for your account, ` +
          `increase account level throughput before retrying. Error: ${err.message}`
      )
      return
    default:
      console.error(
        `An exception occurred, investigate and configure retry strategy. Error: ${err.message}`
      )
      return
  }
}

module.exports = {
  createDynamoDbClient,
  createDeleteItemInput,
  executeDeleteItem
}
