import {MESSAGES_URL, MESSAGE_ACTION_URL} from '../config';
import request from './utils/request';
import parser from './utils/parser';

function loadMessages() {
    return request.get(MESSAGES_URL).then(parser);
}

function updateMessageStatus({oper, id}) {
    return request.post({
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

export default {
    loadMessages,
    updateMessageStatus
};
