const {Page} = require('sdk/page-worker');

let worker;

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
