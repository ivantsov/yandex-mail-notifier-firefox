const {setTimeout} = require('sdk/timers');
const {Page} = require('sdk/page-worker');
const {RECONNECT_INTERVAL, SOCKET, COOKIE: {UID}} = require('../config');
const {getUserInfo, getUnreadCount, getSocketCredentials} = require('./api');
const {getCookie} = require('./cookie');
const {updateState} = require('../observer');

const worker = Page({
    contentURL: './blank.html',
    contentScriptFile: './socket.js'
});
const emit = worker.port.emit;

function connect() {
    const uid = getCookie(UID);

    Promise.all([
        getUserInfo(),
        getUnreadCount(),
        getSocketCredentials(uid)
    ]).then(([user, unreadCount, credentials]) => {
        setTimeout(reconnect, SOCKET.RECONNECT_INTERVAL); // eslint-disable-line no-use-before-define

        emit('connect', credentials);

        updateState({
            user,
            unreadCount
        });
    }).catch(() => setTimeout(connect, RECONNECT_INTERVAL));
}

function disconnect() {
    emit('disconnect');
}

function reconnect() {
    disconnect();
    connect();
}

worker.port.on('reconnect', reconnect);
worker.port.on('newMessage', message => updateState({unreadCount: message.new_messages}));
worker.port.on('changeStatus', () => getUnreadCount().then(unreadCount => updateState({unreadCount})));

module.exports = {
    connect,
    disconnect
};
