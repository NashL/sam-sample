const { JSONResponse } = require('../../utils/responses')
const tableName = process.env.TABLE_NAME || 'Table'

exports.getHandler = (deps) => async (event) => {
  try {
    const params = {
      TableName: tableName,
      Key: JSON.parse(event.body)
    }
    const data = await deps.dynamo.get(params).promise()
    if (Object.entries(data).length === 0 && data.constructor === Object) {
      data.Item = {}
      data.Item.counter = 0
    }
    return JSONResponse(200, { counter: data.Item.counter })
  } catch (err) {
    // console.log('ERROR: ', err)
    return JSONResponse(400, { message: err.message })
  }
}
