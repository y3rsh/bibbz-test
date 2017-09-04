import test from 'ava'
import {getTestContext} from '../lib/test-context'
import {log} from '../lib/logger'

var testContext
// runs once before all the tests start
test.before(async t => {
  testContext = await getTestContext()
})

test.failing('login', async t => {
  // todo
  t.fail()
})
