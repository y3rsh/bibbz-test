
export const environments = [
  {
    'argument': 'PROD',
    'baseUrl': 'https://www.bibbz.net/'
  },
  {
    'argument': 'STAGING',
    'baseUrl': 'https://staging.bibbz.net/'
  },
  {
    'argument': 'TEST',
    'baseUrl': 'https://test.bibbz.net/'
  }
]

export var networkErrorExceptions = [
  {
    'environment': '',
    'text': ''
  }
]

// the strings to look for in console messages that will throw and error and fail the test
export var consoleErrorExceptions = [
  {
    'environment': '',
    'text': ''
  }
]
