const events = require('sdk/system/events');
const {Ci: {nsICookie2}} = require('chrome');
const {COOKIE: {SESSION_ID, HOST, PATH}} = require('../config');
const {getUnreadCount} = require('../utils/api');
const observer = require('../observer');

function changeAuthStatus() {
    getUnreadCount()
        .then(unreadCount => observer.emitEvent('login', {unreadCount}))
        .catch(() => observer.emitEvent('logout', {user: null}));
}

function init() {
    events.on('cookie-changed', ({subject}) => {
        try {
            const {name, host, path} = subject.QueryInterface(nsICookie2);

            if (name === SESSION_ID && host === HOST && path === PATH) {
                changeAuthStatus();
            }
        }
        catch (err) {
            // silent exception
            return;
        }
    }, true);

    // check current auth status
    changeAuthStatus();
}

module.exports = init;
