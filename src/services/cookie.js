const events = require('sdk/system/events');
const {Class} = require('sdk/core/heritage');
const {Ci: {nsICookie2}} = require('chrome');
const {COOKIE: {SESSION_ID, HOST, PATH}} = require('../config');
const {getUnreadCount} = require('../utils/api');
const observer = require('../observer');

const CookieService = Class({
    initialize() {
        this.addListeners();

        // check current auth status
        this.changeAuthStatus();
    },
    addListeners() {
        events.on('cookie-changed', ({subject}) => {
            try {
                const {name, host, path} = subject.QueryInterface(nsICookie2);

                if (name === SESSION_ID && host === HOST && path === PATH) {
                    this.changeAuthStatus();
                }
            }
            catch (err) {
                // silent exception
                return;
            }
        }, true);
    },
    changeAuthStatus() {
        getUnreadCount()
            .then(unreadCount => observer.emitEvent('login', {unreadCount}))
            .catch(() => observer.emitEvent('logout', {user: null}));
    }
});

module.exports = new CookieService();
