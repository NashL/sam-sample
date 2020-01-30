'use strict'

// const AWS_ACCOUNT = process.env.ACCOUNT_ID
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`
// const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/GlobalSQS`

exports.getHandler = async (event, context, callback) => {
  const sqsMessage = event.Records[0].body
  console.log('body: ', sqsMessage)
  // console.log('context: ', context)
  // console.log('callback: ', callback)

  context.done(null, '')
}
