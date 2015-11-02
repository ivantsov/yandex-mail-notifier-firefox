const events = require('sdk/system/events');
const {Class} = require('sdk/core/heritage');
const {Cc, Ci: {nsICookie2}} = require('chrome');
const {COOKIE: {SESSION_ID, HOST, PATH}} = require('../config');
const {getCookie} = require('../utils/cookie');
const observer = require('../observer');

const CookieService = Class({
    initialize() {
        // check current auth status
        this.changeAuthStatus(getCookie(SESSION_ID));

        this.addListeners();
    },
    addListeners() {
        events.on('cookie-changed', ({data, subject}) => {
            const {name, host, path} = subject.QueryInterface(nsICookie2);

            if (name === SESSION_ID && host === HOST && path === PATH) {
                this.changeAuthStatus(data === 'added');
            }
        }, true);
    },
    changeAuthStatus(isAuth) {
        observer.emitEvent(isAuth ? 'login' : 'logout');
    }
});

module.exports = new CookieService();
