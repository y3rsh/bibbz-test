import {log} from './logger'
import {evaluateConsoleMessages, evaluateNetworkMessages} from './process-messages'
import {searchPage} from '../lib/page-objects/locators'
const puppeteer = require('puppeteer')

export async function visitPage (testContext, endpoint) {
  const browser = await puppeteer.launch(testContext.puppeteerParameters)
  const page = await browser.newPage()
  page.setViewport({ width: 1024, height: 768 })
  var listener = listen(page)
  var url = testContext.base.baseUrl + endpoint
  log.info(`testing ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
  browser.close()
  await processMessages(listener)
  return listener.fail
}

export async function inputSearchTerm (testContext) {
  const browser = await puppeteer.launch(testContext.puppeteerParameters)
  const page = await browser.newPage()
  page.setViewport({ width: 1024, height: 768 })
  var listener = listen(page)
  var url = testContext.base.baseUrl + 'viewReports'
  log.info(`testing ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
  await page.waitForSelector(searchPage.mainTextLocator)
  await page.focus(searchPage.mainTextLocator)
  await page.type('skyline')
  browser.close()
  await processMessages(listener, testContext)
  return listener.fail
}

function listen (page) {
  var holder = {}
  holder.fail = false
  page.setViewport({ width: 1024, height: 768 })
  holder.consoleMessages = []
  holder.networkMessages = []
  page.on('console', (a) => {
    var out = {}
    out.message = a
    out.url = page.url()
    holder.consoleMessages.push(out)
    log.debug(out)
  })
  page.on('requestFailed', request => {
    log.error(`${request.url} failed status code ${request.response().status}`)
    holder.fail = true
  })
  page.on('requestfinished', request => {
    holder.networkMessages.push(request)
  })
  page.on('error', error => {
    log.error(`${page.url} has an error ${error}`)
    holder.fail = true
  })
  return holder
}

async function processMessages (listener, testContext) {
  if (await evaluateConsoleMessages(listener.consoleMessages, testContext)) {
    listener.fail = true
  }
  if (await evaluateNetworkMessages(listener.networkMessages, testContext)) {
    listener.fail = true
  }
}
