var {Page} = require('sdk/page-worker');

// TODO: use ES6 class when it will be released

var worker;

function init() {
    worker = Page({
        contentURL: './sound.html',
        contentScriptFile: './sound.js'
    });
}

function playSound() {
    worker.port.emit('playSound');
}

module.exports = {
    init,
    playSound
};
