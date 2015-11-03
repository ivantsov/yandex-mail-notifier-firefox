const {MESSAGES_URL, MESSAGE_ACTION_URL} = require('../config');
const {get, post} = require('./utils/request');
const parser = require('./utils/parser');

function loadMessages() {
    return get(MESSAGES_URL).then(parser);
}

function updateMessageStatus({oper, id}) {
    return post({
        url: MESSAGE_ACTION_URL,
        params: {
            ids: [id],
            oper
        }
    }).then(res => {
        const error = res.querySelector('error');

        if (error) {
            throw new Error(error);
        }
    });
}

module.exports = {
    loadMessages,
    updateMessageStatus
};
