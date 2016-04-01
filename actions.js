var EventEmitter = require('events').EventEmitter,
    actions      = new EventEmitter(),
    spawn        = require('child_process').spawn,
    CONFIG       = {}

var makeHandler = function(type){
  return function (path){
    var parameters = [CONFIG['ACTIONS'][type], path]
    var command = spawn('bash', parameters)
    command.stdout.pipe(process.stdout)  
  }  
}

actions.on('SINGLE_CHANGE', makeHandler('SINGLE_CHANGE'))

actions.on('MULTIPLE_CHANGE', makeHandler('MULTIPLE_CHANGE'))

module.exports = function(config) {
  CONFIG = config
  return actions
}
