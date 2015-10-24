const {unreadApiUrl, apiUrl} = require('../config');
const messagesParser = require('./xml/messages');
const foldersParser = require('./xml/folders');

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

var api = {
    loadMessages() {
        return Promise.all([
            request(apiUrl + 'mailbox_list'),
            request(apiUrl + 'folder_list')
        ]).then(([messages, folders]) => {
            return {
                messages: messagesParser.parse(messages),
                folders: foldersParser.parse(folders)
            };
        });
    }
};

//function userData() {
//    Request({
//        url: API_URL + 'settings_setup',
//        onComplete(res) {
//            if (res.status >= 200 && res.status < 300) {
//                onSuccess(res.json.counters.unread);
//            }
//            else {
//                onError();
//            }
//        }
//    }).get();
//}

module.exports = api;
