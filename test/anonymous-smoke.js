import test from 'ava'
import {getTestContext} from '../lib/test-context'
import {visitPage, inputSearchTerm} from '../lib/test-steps'

var testContext
// runs once before all the tests start
test.before(async t => {
  testContext = await getTestContext()
})

test('navigate to landingPage', async t => {
  var fail = await visitPage(testContext, 'landingPage')
  t.false(fail, 'errors found failing test')
})

test('navigate to about', async t => {
  var fail = await visitPage(testContext, 'about')
  t.false(fail, 'errors found failing test')
})

test('navigate to viewReports', async t => {
  var fail = await visitPage(testContext, 'viewReports')
  t.false(fail, 'errors found failing test')
})

test('navigate to login', async t => {
  var fail = await visitPage(testContext, 'login')
  t.false(fail, 'errors found failing test')
})

test('input search term', async t => {
  var fail = await inputSearchTerm(testContext)
  t.false(fail, 'errors found failing test')
})
