const {API_URL, IGNORED_FOLDERS} = require('../config');
const parser = require('./utils/parser');

function logError(status, res) {
    var error = new Error(status);

    error.response = res;

    console.error(error);
}

function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(this.responseXML);
            } else {
                logError(this.statusText, this.response);
                reject();
            }
        };

        xhr.onerror = function () {
            logError(this.statusText, this.response);
            reject();
        };

        xhr.open('GET', url, true);
        xhr.send();
    });
}

function loadMessages() {
    return request(`${API_URL}mailbox_list?first=0&last=100&extra_cond=only_new&goto=all`).then(parser);
}

module.exports = {
    loadMessages
};
