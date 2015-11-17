const {setTimeout, clearTimeout} = require('sdk/timers');
const {Page} = require('sdk/page-worker');
const {RECONNECT_INTERVAL, SOCKET, COOKIE} = require('../config');
const {getCookie} = require('../utils/cookie');
const {getUserInfo, getUnreadCount, getSocketCredentials} = require('../utils/api');
const observer = require('../observer');

const worker = Page({
    contentURL: './blank.html',
    contentScriptFile: './scripts/socket.js'
});

let timer;

function connect() {
    const uid = getCookie(COOKIE.UID);

    clearTimeout(timer);

    Promise.all([
        getUserInfo(),
        getUnreadCount(),
        getSocketCredentials(uid)
    ]).then(([user, unreadCount, credentials]) => {
        timer = setTimeout(reconnect, SOCKET.RECONNECT_INTERVAL); // eslint-disable-line no-use-before-define

        worker.port.emit('connect', credentials);

        observer.emitEvent('socket:success', {user, unreadCount});
    }).catch(() => {
        setTimeout(connect, RECONNECT_INTERVAL);

        observer.emitEvent('socket:error');
    });
}

function disconnect() {
    worker.port.emit('disconnect');
}

function reconnect() {
    disconnect();
    connect();
}

function init() {
    // UID might not be set immediately - run timeout
    observer.addListener('login', () => setTimeout(connect, COOKIE.TIMEOUT));
    observer.addListener('logout', disconnect);

    worker.port.on('reconnect', reconnect);

    worker.port.on('updateUnreadCount', ({
        operation,
        new_messages,
        mid: id,
        hdr_from: from,
        hdr_subject: subject,
        firstline
    }) => {
        const unreadCount = parseInt(new_messages, 10);

        if (operation === 'insert') {
            const nameMatch = from.match(/^"(.+)"/);
            const emailMatch = from.match(/<(.+)>$/);

            observer.emitEvent('newMessage', {
                unreadCount,
                newMessage: {
                    id,
                    from: nameMatch[1] || emailMatch[1],
                    subject: subject !== 'No subject' ? subject : '',
                    firstline
                }
            });
        }
        else if (!Number.isNaN(unreadCount)) {
            observer.emitEvent('unreadCountChanged', {unreadCount});
        }
        else {
            getUnreadCount().then(unreadCount => observer.emitEvent('unreadCountChanged', {unreadCount})); // eslint-disable-line no-shadow
        }
    });
}

module.exports = init;
