// const { getHandler } = require('./handlers/get')
// const { putHandler } = require('./handlers/put')
// getLambda: getHandler(),

// module.exports = {
//   putLambda: putHandler()
// }
'use strict'

const AWS = require('aws-sdk')
const sqs = new AWS.SQS({ region: 'us-east-1' })
const AWS_ACCOUNT = process.env.ACCOUNT_ID
console.log('AWS_ACCOUNT: ', AWS_ACCOUNT)

const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/GlobalSQS`
console.log('QUEUE_URL: ', QUEUE_URL)

exports.putLambda = (event, context, callback) => {
  console.log('process.env.ACCOUNT_ID: ', process.env.ACCOUNT_ID)
  const params = {
    MessageBody: 'Hello World!',
    QueueUrl: QUEUE_URL
  }
  console.log('******************** FIN ********************')
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

exports.getLambda = (event, context, callback) => {
  const sqsMessage = event.Records[0].body
  console.log('body: ', sqsMessage)
  // console.log('context: ', context)
  // console.log('callback: ', callback)

  context.done(null, '')
}
