const { JSONResponse } = require('../../utils/responses')

exports.deleteHandler = deps => async (event) => {
  try {
    throw new Error('something bad happened')
  } catch (err) {
    // console.log(err);
    return JSONResponse(500, { message: 'Internal Server Error' })
  }
}
