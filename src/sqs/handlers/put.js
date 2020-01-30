'use strict'

const AWS = require('aws-sdk')
const sqs = new AWS.SQS({ region: 'us-east-1' })
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`

const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/082889196624/GlobalSQS'

exports.putHandler = (event, context, callback) => {
  const params = {
    MessageBody: 'Hello World!',
    QueueUrl: QUEUE_URL
  }
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('error:', 'Fail Send Message' + err)

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR'
        })
      }

      callback(null, response)
    } else {
      console.log('data:', data.MessageId)

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId
        })
      }

      callback(null, response)
    }
  })
}
