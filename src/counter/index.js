const { getHandler } = require('./handlers/get')
const { putHandler } = require('./handlers/put')
const { deleteHandler } = require('./handlers/delete')
const dynamoDbClient = require('../utils/dynamoDbClient')

module.exports = {
  getLambda: getHandler({
    dynamo: dynamoDbClient.connect()
  }),
  putLambda: putHandler({
    dynamo: dynamoDbClient.connect()
  }),
  deleteLambda: deleteHandler()
}
