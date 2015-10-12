var {setInterval, clearInterval} = require('sdk/timers');
var prefs = require('sdk/simple-prefs');
var parser = require('./workers/parser');

// TODO: use ES6 class when it will be released

var timer;

function run() {
    parser();

    clearInterval(timer);
    timer = setInterval(parser, prefs.prefs.checkInterval);
}

function init() {
    run();

    prefs.on('checkInterval', run);
}

module.exports.init = init;