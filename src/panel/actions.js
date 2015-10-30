const api = require('./api');
const {
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_STATUS_SUCCESS,
    UPDATE_MESSAGE_STATUS_ERROR
} = require('./constants');

function loadMessages() {
    return dispatch => {
        return api.loadMessages()
            .then(data =>
                dispatch({
                    type: LOAD_MESSAGES_SUCCESS,
                    data
                })
            )
            .catch(err => {
                dispatch({type: LOAD_MESSAGES_ERROR});

                console.error(err.message, err.stack); // eslint-disable-line no-console
            });
    };
}

function updateMessageStatus(data) {
    return dispatch => {
        return api.updateMessageStatus(data)
            .then(() => {
                dispatch({
                    type: UPDATE_MESSAGE_STATUS_SUCCESS,
                    id: data.id
                });
            })
            .catch(err => {
                dispatch({type: UPDATE_MESSAGE_STATUS_ERROR});

                console.error(err.message, err.stack); // eslint-disable-line no-console
            });
    };
}

module.exports = {
    loadMessages,
    updateMessageStatus
};
