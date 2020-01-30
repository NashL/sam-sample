'use strict'

// const AWS_ACCOUNT = process.env.ACCOUNT_ID
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/GlobalSQS`

exports.getHandler = (event, context, callback) => {
  console.log('it was called')

  console.log(event)

  context.done(null, '')
}
