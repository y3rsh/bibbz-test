# Bibbz Testing

> Use puppeteer to navigate around Bibbz looking for errors.

## Purpose

This suite is to demonstrate using puppeteer to functionally test a website.  I have used Ava as the test runner because it fast(parallel execution out of the box), easy to use, and forward thinking.

## Docker path - Preferred

Using docker makes setup more repeatable and portable than a local machine setup.  We are using a dev container setup, mounting in the source repository and putting the yarn cache into a docker volume.  [Please see the Puppeteer repository for this discussion.](https://github.com/GoogleChrome/puppeteer/blob/7075c4cd4f1dcc42d1c805e63311b2d8df7af2a6/docs/troubleshooting.md)
I have removed the un-privileged user from their suggestion as it did not fix the issue of needing --no-sandbox on puppeteer in the container.

Do I ever need to run locally?

> The only reason to run locally is to debug difficult problems. If you do, make the browser HEADLESS=false to see what is happening.

What the Dockerfile and build.sh are accomplishing:

1. Create a volume for the Docker yarn cache if it does not already exist.
1. Create and configure a base container that can run node, yarn, and puppeteer
1. Run the container in interactive mode, mounting the source repository and the yarn cache.

### Instructions

1. Install Docker
1. Clone this repository with git
1. Use the build script

  ```bash
  chmod +x build.sh
  ```

  ```bash
  ./build.sh
  ```

Now you are in the container. Run the tests.

```bash
ENVIRONMENT=PROD NO_SANDBOX=true yarn test
```

> Local changes to our repository show up in the container.  This is the purpose of mounting the repository, so we can use a local text editor and then run the code in the container.

## How the tests work

We use the test phase pointed at Ava for our tests.  To set options for the test we use environment variables.  These can be set through export or on the command line. A testContext object is created in the beforeTest step.  Read the code in test-context.js to understand the possibilities for environment variables. ENVIRONMENT is currently the only required variable.  ENVIRONMENT=PROD is the only valid setting, the other values are examples.

## Run a test

Here are some valid options.  See Ava doc for test running options. NO_SANDBOX=true must be set when running in Docker :sadface:

- `ENVIRONMENT=PROD NO_SANDBOX=true yarn test`  // run all the tests
- `ENVIRONMENT=PROD NO_SANDBOX=true yarn test -m unit:*` // just the unit - test (filtering on name)
- `ENVIRONMENT=PROD NO_SANDBOX=true yarn test -m input*` // just run the input test (filtering on name)
- `ENVIRONMENT=PROD NO_SANDBOX=true yarn test -m navigate*` // just run the navigate tests (filtering on name)

## To use locally

> use if you watch to watch locally `HEADLESS=false`

- use homebrew or nvm to install node 

```bash
brew install node
```

- use homebrew or yarn's instructions to install yarn 

```bash
brew install yarn
```

- clone this repo with git
- locally install the project dependencies in the base directory 

```bash
yarn install
```