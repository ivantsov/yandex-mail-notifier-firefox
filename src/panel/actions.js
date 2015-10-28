const api = require('./api');
const {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR
} = require('./constants');

function loadMessages() {
    return dispatch => {
        dispatch({type: LOAD_MESSAGES});

        return api.loadMessages()
            .then(data =>
                dispatch({
                    type: LOAD_MESSAGES_SUCCESS,
                    data
                })
            )
            .catch(err => console.error(err.stack));
    };
}


module.exports = {
    loadMessages
};