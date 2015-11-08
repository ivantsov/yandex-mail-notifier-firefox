const {Page} = require('sdk/page-worker');
const {prefs} = require('sdk/simple-prefs');

const worker = Page({
    contentURL: './blank.html',
    contentScriptFile: './scripts/sound.js'
});

function playSound() {
    worker.port.emit('playSound');
}

function playNewMessage() {
    if (prefs.newMessageSound) {
        playSound();
    }
}

function playUnread(unreadCount) {
    if (prefs.unreadMessagesSound && unreadCount > 0) {
        playSound();
    }
}

function playNotAuth() {
    if (prefs.notAuthNotification === 2) {
        playSound();
    }
}

module.exports = {
    playNewMessage,
    playUnread,
    playNotAuth
};
