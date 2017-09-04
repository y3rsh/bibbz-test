import { log } from './logger'

export function evaluateConsoleMessages (consoleMessages, testContext) {
  var fail = false
  consoleMessages.forEach(async function (m) {
    log.debug(`console message: ${m}`)
    testContext.consoleErrorStrings.forEach(async function (e) {
      if (m.message.toLowerCase().includes(e)) {
        log.error('console output contains consoleErrorStrings: ' + JSON.stringify(m))
        fail = true
      }
    })
  })
  return fail
}

export function evaluateNetworkMessages (requestMessages, testContext) {
  var fail = false
  requestMessages.forEach(async function (request) {
    log.debug(`response code: ${request.response().status} url: ${request.url}`)
    if (request.response().status >= 400) {
      log.error(`response code: ${request.response().status} url: ${request.url}`)
      testContext.networkErrorExceptions.forEach(async function (exception) {
        if (request.url.toLowerCase().includes(exception.text.toLowerCase())) {
          log.info(`network error expected for ${JSON.stringify(exception)}`)
          log.info(`not failing test for response code: ${request.response().status} url : ${request.url}`)
        } else {
          fail = true
        }
      })
    }
  })
  return fail
}
