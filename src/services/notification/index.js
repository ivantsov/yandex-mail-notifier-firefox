const prefs = require('sdk/simple-prefs');
const {setInterval, clearInterval} = require('sdk/timers');
const {NOT_AUTH_NOTIFICATION_INTERVAL} = require('../../config');
const observer = require('../../observer');
const {
    showNewMessage,
    showUnread,
    showNotAuth
} = require('./desktop');
const {
    playNewMessage,
    playUnread,
    playNotAuth
} = require('./sound');

let unreadTimer, notAuthTimer;

function onNewMessage({newMessage}) {
    showNewMessage(newMessage);
    playNewMessage();
}

function disableUnread() {
    clearInterval(unreadTimer);
}

function enableUnread() {
    if (prefs.prefs.unreadMessagesNotification) {
        disableUnread();

        unreadTimer = setInterval(() => {
            const {unreadCount} = observer.getState();

            showUnread(unreadCount);
            playUnread(unreadCount);
        }, prefs.prefs.unreadMessagesNotification);
    }
}

function onUnreadChange() {
    const {user} = observer.getState();

    if (user) {
        prefs.prefs.unreadMessagesNotification ? enableUnread() : disableUnread();
    }
}

function disableNotAuth() {
    clearInterval(notAuthTimer);
}

function enableNotAuth() {
    if (prefs.prefs.notAuthNotification) {
        disableNotAuth();

        notAuthTimer = setInterval(() => {
            showNotAuth();
            playNotAuth();
        }, NOT_AUTH_NOTIFICATION_INTERVAL);
    }
}

function onNotAuthChange() {
    const {user} = observer.getState();

    if (!user) {
        prefs.prefs.notAuthNotification ? enableNotAuth() : disableNotAuth();
    }
}

function init() {
    // new message notifications
    observer.addListener('newMessage', onNewMessage);

    // unread notifications
    observer.addListener('socket:success', enableUnread);
    observer.addListener('logout', disableUnread);
    prefs.on('unreadMessagesNotification', onUnreadChange);

    // not auth notifications
    observer.addListener('login', disableNotAuth);
    observer.addListener('logout', enableNotAuth);
    prefs.on('notAuthNotification', onNotAuthChange);
}

module.exports = init;
