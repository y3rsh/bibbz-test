import { log } from './logger'

export function evaluateConsoleMessages (consoleMessages, testContext) {
  var fail = false
  consoleMessages.forEach(async function (m) {
    if (m.type === 'error') {
      var isException = false
      testContext.networkErrorExceptions.forEach(async function (exception) {
        if (m.text.toLowerCase().includes(exception.text.toLowerCase()) &&
          (exception.environment === testContext.base.environment || exception.environment === 'all')) {
          log.info(`console error expected for ${JSON.stringify(exception)}`)
          log.info(`not failing test for console error: ${JSON.stringify(m)}`)
          isException = true
        }
      })
      if (!isException) {
        log.error('console error: ' + JSON.stringify(m))
        fail = true
      }
    }
  })
  return fail
}

export function evaluateNetworkMessages (requestMessages, testContext) {
  var fail = false
  requestMessages.forEach(async function (request) {
    if (request.response().status >= 400) {
      var isException = false
      testContext.networkErrorExceptions.forEach(async function (exception) {
        if (request.url.toLowerCase().includes(exception.text.toLowerCase()) &&
          (exception.environment === testContext.base.environment || exception.environment === 'all')) {
          log.info(`network error expected for ${JSON.stringify(exception)}`)
          log.info(`not failing test for response code: ${request.response().status} url : ${request.url}`)
          isException = true
        }
      })
      if (!isException) {
        log.error(`network error - response code: ${request.response().status} url: ${request.url}`)
        fail = true
      }
    }
  })
  return fail
}
