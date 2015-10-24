const {ignoredFolders} = require('../config');
import api from './api';
import {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR
} from './constants';

function getFilteredMessage({messages, folders}) {
    return messages.filter(({fid}) => {
        const folder = folders.find(({id}) => id === fid);

        return (!folder || ignoredFolders.indexOf(folder.symbol) < 0);
    });
}

export function loadMessages() {
    return dispatch => {
        dispatch({type: LOAD_MESSAGES});

        return api.loadMessages()
            .then(data => {
                const messages = getFilteredMessage(data);

                dispatch({
                    type: LOAD_MESSAGES_SUCCESS,
                    messages
                })
            });
    };
}
