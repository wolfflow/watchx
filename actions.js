var EventEmitter = require('events').EventEmitter,
    actions      = new EventEmitter(),
    spawn        = require('child_process').spawn,
    CONFIG       = {}

actions.on('SINGLE_CHANGE', function(path) {
  var parameters = [CONFIG['ACTIONS']['SINGLE_CHANGE'], path]
  var command = spawn('bash', parameters)
  command.stdout.pipe(process.stdout)
})

actions.on('MULTIPLE_CHANGE', function(paths) {
  var parameters = [CONFIG['ACTIONS']['MULTIPLE_CHANGE']].concat(paths)
  var command = spawn('bash', parameters)
  command.stdout.pipe(process.stdout)
})

module.exports = function(config) {
  CONFIG = config
  return actions
}
