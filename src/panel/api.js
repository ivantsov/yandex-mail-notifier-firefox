const {API_URL, IGNORED_FOLDERS} = require('../config');
const userParser = require('./utils/xml/user');
const messagesParser = require('./utils/xml/messages');

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

function loadData() {
    return Promise.all([
        request(`${API_URL}settings_setup`),
        request(`${API_URL}mailbox_list?first=0&last=100&extra_cond=only_new&goto=all`)
    ]).then(([userXml, messagesXml]) => {
        const user = userParser(userXml);
        const {messages, unreadCount} = messagesParser(messagesXml);

        return {
            user,
            unreadCount,
            messages
        };
    });
}

module.exports = {
    loadData
};
