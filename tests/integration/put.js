'use strict'
const { putHandler } = require('../../src/counter/handlers/put')
const AWS = require('aws-sdk-mock')
const eventFactory = require('../../src/utils/mockEventFactory')

const chai = require('chai')
const expect = chai.expect

const dynamoDbClient = require('../../src/utils/dynamoDbClient')

describe('When we increment the counter with PUT method', function () {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient')
  })

  it('verifies successful response after increasing the counter for the first time', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 0 } })
    })
    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 1 } })
    })

    const { headers, statusCode, body } = await putHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.putEvent())

    expect(headers['Content-Type']).to.equal('application/json')
    expect(statusCode).to.equal(200)
    expect(body).to.be.an('string')

    const parsedBody = JSON.parse(body)
    expect(parsedBody).to.be.an('object')
    expect(parsedBody.counter).to.be.equal(1)
  })

  it('verifies error response if dynamoDb fails', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      callback(new Error('fail'))
    })

    const { headers, statusCode, body } = await putHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.putEvent())
    expect(headers['Content-Type']).to.equal('application/json')
    expect(statusCode).to.equal(400)
    expect(JSON.parse(body).message).to.equal('fail')
  })
})
