# Bibbz Testing
> Use puppeteer to navigate around Bibbz looking for errors.

## Purpose
This suite is to demonstrate using puppeteer to functionally test a website.  I have used Ava as the test runner because it fast(parallel execution out of the box), easy to use, and forward thinking.

## Tools
- use homebrew or nvm to install node 
```
brew install node
```
- use homebrew or yarn's instructions to install yarn 
```
brew install yarn
```
- clone this repo with git
- locally install the project dependencies in the base directory 
```
yarn install
```
## How the tests work
We use the test phase pointed at Ava for our tests.  To set options for the test we use environment variables.  These can be set through export or on the command line. A testContext object is created in the beforeTest step.  Read the code in test-context.js to understand the possibilities for environment variables. ENVIRONMENT is currently the only required variable.  ENVIRONMENT=PROD is the only valid setting, the other values are examples.

## Run a test
Here are some valid options.  See Ava doc for test running options.
- `ENVIRONMENT=PROD yarn test`  // run all the tests
- `ENVIRONMENT=PROD yarn test -- -m -m unit:*` // just the unit - test (filtering on name)
- `ENVIRONMENT=PROD yarn test -- -m -m input*` // just run the input test (filtering on name)
- `ENVIRONMENT=PROD yarn test -- -m -m navigate*` // just run the navigate tests (filtering on name)