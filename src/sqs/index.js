'use strict'

const { getHandler } = require('./handlers/get')
const { putHandler } = require('./handlers/put')

module.exports = {
  getLambda: getHandler(),
  putLambda: putHandler()
}
