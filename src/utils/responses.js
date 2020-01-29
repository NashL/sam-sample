exports.JSONResponse = (statusCode, body, additionalHeaders) => {
  return ({
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...additionalHeaders }
  })
}
