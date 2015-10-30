const {get, post} = require('./utils/request');
const parser = require('./utils/parser');

function loadMessages() {
    return get('mailbox_list?first=0&last=100&extra_cond=only_new&goto=all').then(parser);
}

function updateMessageStatus({oper, id}) {
    return post({
        url: 'mailbox_oper',
        params: {
            ids: [id],
            oper
        }
    }).then(res => {
        const errorTag = res.querySelector('error');
        const error = errorTag ? errorTag[0] : null;

        if (error) {
            throw new Error(error);
        }
    });
}

module.exports = {
    loadMessages,
    updateMessageStatus
};
