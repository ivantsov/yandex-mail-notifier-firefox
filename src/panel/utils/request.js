const {API_URL} = require('../../config');

function logError(status, res) {
    var error = new Error(status);

    error.response = res;

    console.error(error);
}

function encodeParam(name, value) {
    return `${name}=${encodeURIComponent(value)}`;
}

function getParamsString(params = {}) {
    let keys = [];

    Object.keys(params).forEach(key => {
        let value = params[key];

        if (Array.isArray(value)) {
            value.forEach(item => keys.push(encodeParam(key, item)));
        }
        else {
            keys.push(encodeParam(key, value));
        }
    });

    return keys.join('&');
}

function request({type, url, params}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(this.responseXML);
            }
            else {
                logError(this.statusText, this.response);
                reject();
            }
        };

        xhr.onerror = function () {
            logError(this.statusText, this.response);
            reject();
        };

        xhr.open(type, `${API_URL}${url}`, true);

        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }

        xhr.send(getParamsString(params));
    });
}

function post(data) {
    return request({
        type: 'POST',
        ...data
    });
}

function get(url) {
    return request({
        type: 'GET',
        url
    });
}

module.exports = {
    get,
    post
};
