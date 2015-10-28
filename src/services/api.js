const {XMLHttpRequest} = require('sdk/net/xhr');
const {API_URL, UNREAD_MESSAGE_URL, SOCKET} = require('../config');

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

function request({url, type}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                let result;

                if (type === 'json') {
                    result = JSON.parse(this.response);

                    if (result.code === 'AUTH_NO_AUTH') {
                        reject(createError(createUnauthorizedError(res)));
                    }
                }
                else if (type === 'xml') {
                    result = this.responseXML;
                }

                resolve(result);
            }
            else {
                reject(createError(this));
            }
        };

        xhr.onerror = function () {
            reject(createError(this));
        };

        xhr.open('GET', url, true);
        xhr.send();
    });
}

function getUserInfo() {
    return request({
        url: `${API_URL}settings_setup`,
        type: 'xml'
    }).then(res => {
        const error = res.querySelector('error');

        if (error) {
            throw new Error(`Error occurred while parsing user xml ${error.getAttribute('code')}`);
        }

        return res.querySelector('body').querySelector('default_email').textContent;
    });
}

function getUnreadCount() {
    return request({
        url: UNREAD_MESSAGE_URL,
        type: 'json'
    }).then(res => res.counters.unread);
}

function getSocketCredentials(uid) {
    if (!uid) {
        return Promise.reject(createError(createUnauthorizedError()));
    }

    return request({
        url: `${SOCKET.CREDENTIALS_URL}?req=${uid}`,
        type: 'json'
    });
}

module.exports = {
    getUserInfo,
    getUnreadCount,
    getSocketCredentials
};
