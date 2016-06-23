var winston = require('winston')

exports.init = function(){

  global.w = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'info',
        colorize: true,
      }),
      new (winston.transports.File)({
        level: 'silly',
        filename: './logs/log.txt'
      })
    ]
  });
  
}