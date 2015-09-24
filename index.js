#!/usr/bin/env node

var chokidar     = require('chokidar'),
    debounce     = require('lodash').debounce,
    fs           = require('fs')

var configFile = process.argv[2] || 'watchx.json'
var CONFIG = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
var actions = require('./actions')(CONFIG)

var watcher  = chokidar.watch(CONFIG['DIR'], {
    ignored: CONFIG['IGNORE'],
    ignoreInitial: true,
    cwd: CONFIG['DIR']
})

var eventsCounter = 0,
    changedFiles = []

var triggerAction = debounce(function() {
  var action = (eventsCounter == 1)
    ? 'SINGLE_CHANGE'
    : 'MULTIPLE_CHANGE'

  if (action == 'SINGLE_CHANGE') changedFiles = changedFiles[0]

  actions.emit(action, changedFiles)

  eventsCounter = 0
  changedFiles = []
}, CONFIG['DEBOUNCE'])

watcher
  .on('change', function(path) {
    eventsCounter++
    changedFiles.push(path)

    triggerAction()
  })
