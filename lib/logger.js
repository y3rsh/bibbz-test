const winston = require('winston')
const tsFormat = () => (new Date()).toLocaleTimeString()
export const log = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: process.env.LOG_LEVEL
    })
  ]
})
