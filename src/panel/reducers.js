const {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR
} = require('./constants');

function reducer(state, action) {
    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                loading: true,
                ...state
            };
        case LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.data
            };
        default:
            return state;
    }
}

module.exports = reducer;
