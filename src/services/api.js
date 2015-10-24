const {Request} = require('sdk/request');
const {UNREAD_MESSAGE_URL, SOCKET} = require('../config');

function createError(res) {
    let err = new Error(res.statusText);

    err.response = res;

    console.error(err);

    return err;
}

function createUnauthorizedError(res) {
    return Object.assign({}, res, {
        status: 401,
        statusText: 'Unauthorized'
    });
}

function request(url) {
    return new Promise((resolve, reject) => {
        Request({
            url,
            onComplete(res) {
                if (res.status >= 200 && res.status < 300) {
                    if (res.json.code === 'AUTH_NO_AUTH') {
                        reject(createError(createUnauthorizedError(res)));
                    }

                    resolve(res.json)
                }
                else {
                    reject(createError(res));
                }
            }
        }).get();
    });
}

function getUnreadCount() {
    return request(UNREAD_MESSAGE_URL).then(res => res.counters.unread);
}

function getSocketCredentials(uid) {
    if (!uid) {
        return Promise.reject(createError(createUnauthorizedError()));
    }

    return request(`${SOCKET.CREDENTIALS_URL}?req=${uid}`);
}

module.exports = {
    getUnreadCount,
    getSocketCredentials
};
