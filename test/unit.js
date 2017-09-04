import test from 'ava'
import faker from 'faker'
import { getTestContext, getBaseEnvironment } from '../lib/test-context'
import { baseUrlTest } from './fixtures/data'
import { log } from '../lib/logger'

var testContext

// runs once before all the tests start
test.before(async t => {
  testContext = await getTestContext()
})

test('unit: base url resolves valid arguments', async t => {
  baseUrlTest.forEach(async function (target) {
    var baseEnvironment = await getBaseEnvironment(target.argument)
    t.is(baseEnvironment[0].baseUrl, target.expected)
    t.is(baseEnvironment.length, 1, 'configuration.environments has identical arguments')
  })
})

test('unit: handle base url paramter is garbage', async t => {
  var baseUrlParameter = faker.fake('{{lorem.word}}')
  log.info(`faked base url param = ${baseUrlParameter}`)
  const error = t.throws(() => {
    getBaseEnvironment(baseUrlParameter)
  }, Error)
  t.is(error.message, `ENVIRONMENT value: ${baseUrlParameter} is not valid`)
})

test('unit: handle base url paramter is empty', async t => {
  var baseUrlParameter = ''
  const error = t.throws(() => {
    getBaseEnvironment(baseUrlParameter)
  }, Error)
  t.is(error.message, 'ENVIRONMENT must be set')
})
