const {setTimeout} = require('sdk/timers');
const {Page} = require('sdk/page-worker');
const {Class} = require('sdk/core/heritage');
const {RECONNECT_INTERVAL, SOCKET, COOKIE} = require('../config');
const {getCookie} = require('../utils/cookie');
const {getUserInfo, getUnreadCount, getSocketCredentials} = require('../utils/api');
const observer = require('../observer');

const SocketService = Class({
    initialize() {
        this.worker = Page({
            contentURL: './blank.html',
            contentScriptFile: './scripts/socket.js'
        });

        this.addListeners();
    },
    addListeners() {
        // UID might not be set immediately - run timeout
        observer.addListener('login', () => setTimeout(this.connect.bind(this), COOKIE.TIMEOUT));
        observer.addListener('logout', this.disconnect.bind(this));

        this.worker.port.on('reconnect', this.reconnect.bind(this));

        this.worker.port.on('updateUnreadCount', ({
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
    },
    connect() {
        const uid = getCookie(COOKIE.UID);

        Promise.all([
            getUserInfo(),
            getUnreadCount(),
            getSocketCredentials(uid)
        ]).then(([user, unreadCount, credentials]) => {
            setTimeout(this.reconnect.bind(this), SOCKET.RECONNECT_INTERVAL); // eslint-disable-line no-use-before-define

            this.worker.port.emit('connect', credentials);

            observer.emitEvent('socket:success', {user, unreadCount});
        }).catch(() => {
            setTimeout(this.connect.bind(this), RECONNECT_INTERVAL);

            observer.emitEvent('socket:error');
        });
    },
    disconnect() {
        this.worker.port.emit('disconnect');
    },
    reconnect() {
        this.disconnect();
        this.connect();
    }
});

module.exports = new SocketService();
