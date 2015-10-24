const {setTimeout} = require('sdk/timers');
const {Page} = require('sdk/page-worker');
const {Class} = require('sdk/core/heritage');
const {RECONNECT_INTERVAL, SOCKET, COOKIE: {UID}} = require('../config');
const {getUnreadCount, getSocketCredentials} = require('./api');
const {getCookie} = require('./cookie');
const {updateState, updateStateToInitial} = require('../observer');

const worker = Page({
    contentURL: './blank.html',
    contentScriptFile: './socket.js'
});
const emit = worker.port.emit;

worker.port.on('reconnect', reconnect);
worker.port.on('newMessage', message => updateState({unreadCount: message.new_messages}));
worker.port.on('changeStatus', () => getUnreadCount().then(unreadCount => updateState({unreadCount})));

function connect() {
    const uid = getCookie(UID);

    Promise.all([
        getUnreadCount(),
        getSocketCredentials(uid)
    ]).then(([unreadCount, credentials]) => {
        emit('connect', credentials);

        setTimeout(reconnect, SOCKET.RECONNECT_INTERVAL);

        updateState({
            isAuth: true,
            unreadCount
        });
    }).catch(err => {
        setTimeout(connect, RECONNECT_INTERVAL);

        updateStateToInitial();
    });
}

function reconnect() {
    disconnect();
    connect();
}

function disconnect() {
    emit('disconnect');
}

module.exports = {
    connect,
    disconnect
};
