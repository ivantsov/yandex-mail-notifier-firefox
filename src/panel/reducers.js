const {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR
} = require('./constants');

const initialState = {
    loading: true,
    messages: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                loading: true
            };
        case LOAD_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.messages
            };
        default:
            return state;
    }
}

module.exports = reducer;
