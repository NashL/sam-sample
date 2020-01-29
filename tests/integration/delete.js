'use strict'
const { deleteHandler } = require('../../src/counter/handlers/delete')
const eventFactory = require('../../src/utils/mockEventFactory')

const chai = require('chai')
const expect = chai.expect

const dynamoDbClient = require('../../src/utils/dynamoDbClient')

describe('When we try to delete the counter', function () {
  it('verifies error response', async () => {
    const { headers, statusCode, body } = await deleteHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent())

    expect(headers['Content-Type']).to.equal('application/json')
    expect(statusCode).to.equal(500)
    expect(body).to.be.an('string')

    const parsedBody = JSON.parse(body)
    expect(parsedBody).to.be.an('object')
    expect(parsedBody.message).to.be.equal('Internal Server Error')
  })
})
