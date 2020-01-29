'use strict'
const { getHandler } = require('../../src/counter/handlers/get')
const AWS = require('aws-sdk-mock')
const eventFactory = require('../../src/utils/mockEventFactory')

const chai = require('chai')
const expect = chai.expect

const dynamoDbClient = require('../../src/utils/dynamoDbClient')

describe('When we GET the counter', () => {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient')
  })

  it('verifies successful response', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 0 } })
    })

    const { headers, statusCode, body } = await getHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent())
    expect(headers['Content-Type']).to.equal('application/json')
    expect(statusCode).to.equal(200)
    expect(body).to.be.an('string')

    const parsedBody = JSON.parse(body)
    expect(parsedBody).to.be.an('object')
    expect(parsedBody.counter).to.be.equal(0)
  })

  it('verifies error response if dynamoDb fails', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(new Error('fail'))
    })

    const { headers, statusCode, body } = await getHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent())
    expect(headers['Content-Type']).to.equal('application/json')
    expect(statusCode).to.equal(400)
    expect(JSON.parse(body).message).to.equal('fail')
  })
})
