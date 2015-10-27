const {setTimeout} = require('sdk/timers');
const {COOKIE: {SESSION_ID, TIMEOUT}} = require('./src/config');
const {getCookie, addChangeListener} = require('./src/services/cookie');
const {connect, disconnect} = require('./src/services/socket');
const {updateStateToInitial} = require('./src/observer');
const button = require('./src/ui/button');

button.init();

// user is already authenticated
if (getCookie(SESSION_ID)) {
    connect();
}

addChangeListener(isAuth => {
    if (isAuth) {
        // user just authorized
        // UID might not be set immediately - run timeout
        setTimeout(connect, TIMEOUT);
    }
    else {
        // user left
        disconnect();

        updateStateToInitial();
    }
});
