const events = require('sdk/system/events');
const {Class} = require('sdk/core/heritage');
const {Ci: {nsICookie2}} = require('chrome');
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
            try {
                const {name, host, path} = subject.QueryInterface(nsICookie2);

                if (name === SESSION_ID && host === HOST && path === PATH) {
                    this.changeAuthStatus(data === 'added');
                }
            }
            catch(err) {
                console.error(err);
            }
        }, true);
    },
    changeAuthStatus(isAuth) {
        isAuth ? observer.emitEvent('login') : observer.emitEvent('logout', {user: null});
    }
});

module.exports = new CookieService();
