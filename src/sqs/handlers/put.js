'use strict'

const AWS = require('aws-sdk')
const sqs = new AWS.SQS({ region: 'us-east-1' })
const AWS_ACCOUNT = process.env.ACCOUNT_ID
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`
const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/GlobalSQS`

exports.putHandler = (event, context, callback) => {
  console.log('process.env: ', process.env)
  console.log('process.env.ACCOUNT_ID: ', process.env.ACCOUNT_ID)
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
