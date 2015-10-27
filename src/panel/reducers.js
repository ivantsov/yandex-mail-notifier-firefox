const {
    LOAD_DATA,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_ERROR
} = require('./constants');

const initialState = {
    loading: false,
    user: '',
    unreadCount: 0,
    messages: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                loading: true
            };
        case LOAD_DATA_SUCCESS:
            return {
                loading: false,
                user: action.user,
                unreadCount: action.unreadCount,
                messages: action.messages
            };
        default:
            return state;
    }
}

module.exports = reducer;
