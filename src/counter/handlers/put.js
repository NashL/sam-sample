const { JSONResponse } = require('../../utils/responses')
const tableName = process.env.TABLE_NAME || 'Table'

exports.putHandler = deps => async (event) => {
  const currentValue = await getCurrentCounter(deps, event)
  const newCounterValue = parseInt(currentValue) + 1
  const parsedBody = JSON.parse(event.body)
  parsedBody.counter = newCounterValue
  try {
    await deps.dynamo.put({ TableName: tableName, Item: parsedBody }).promise()
    return JSONResponse(200, { counter: newCounterValue })
  } catch (err) {
    // console.log(err);
    return JSONResponse(400, { message: err.message })
  }
}

const getCurrentCounter = async (deps, event) => {
  const params = {
    TableName: tableName,
    Key: {
      id: JSON.parse(event.body).id
    }
  }

  try {
    const data = await deps.dynamo.get(params).promise()
    return data.Item.counter
  } catch (err) {
    console.log('err', err)
    return 0
  }
}
