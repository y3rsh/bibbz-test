import {log} from './logger'
import {environments, networkErrorExceptions, consoleErrorExceptions} from './configuration'

export async function getTestContext () {
  var testContext = {}
  testContext.base = await getBaseEnvironment(process.env.ENVIRONMENT)[0]
  testContext.logLevel = process.env.LOG_LEVEL
  testContext.headless = process.env.HEADLESS
  testContext.slowMo = process.env.SLOWMO
  testContext.noSandbox = process.env.NO_SANDBOX
  testContext.dumpio = process.env.DUMPIO
  testContext.username = process.env.USERNAME
  testContext.password = process.env.PASSWORD
  testContext.puppeteerParameters = await getPuppeteerParameters(testContext)
  testContext.networkErrorExceptions = networkErrorExceptions
  testContext.consoleErrorExceptions = consoleErrorExceptions
  log.info(testContext)
  return testContext
}

export function getBaseEnvironment (environmentArgument) {
  if (!environmentArgument) {
    log.error('ENVIRONMENT must be set')
    throw new Error('ENVIRONMENT must be set')
  }
  var environment = environments.filter(function (target) {
    return target.argument.match(environmentArgument)
  })
  if (environment.length !== 1) {
    log.error('ENVIRONMENT value not found')
    throw new Error(`ENVIRONMENT value: ${environmentArgument} is not valid`)
  }
  log.info(`the environment is ${JSON.stringify(environment)}`)
  return environment
}

async function getPuppeteerParameters (testContext) {
  var puppeteerArguments = {}
  // puppeteerArguments.ignoreHTTPSErrors = true // set for all due to individual webhead path being insecure
  if (testContext.noSandbox === 'true') {
    puppeteerArguments.args = ['--no-sandbox', '--disable-setuid-sandbox'] // to run as root - in docker containers
  }
  if (testContext.dumpio === 'true') {
    puppeteerArguments.dumpio = true
  }
  if (testContext.headless === 'false') {
    puppeteerArguments.headless = false
  }
  if (testContext.slowMo) {
    puppeteerArguments.slowMo = parseInt(testContext.slowMo)
  }
  log.info('puppeteer params are ' + await JSON.stringify(puppeteerArguments) + ' : set in code')
  return puppeteerArguments
}
