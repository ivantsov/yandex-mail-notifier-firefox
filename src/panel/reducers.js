const {
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,

	UPDATE_MESSAGE_STATUS_SUCCESS,
	UPDATE_MESSAGE_STATUS_ERROR
} = require('./constants');

function getItemsWithout(item, id) {
	return item.filter(item => item.id !== id);
}

function reducer(state, action) {
    switch (action.type) {
        case LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.data
            };
		case LOAD_MESSAGES_ERROR:
			return {
				...state,
				loading: false,
				loadingError: true
			};
		case UPDATE_MESSAGE_STATUS_SUCCESS:
			return {
				...state,
				unreadCount: state.unreadCount - 1,
				messages: getItemsWithout(state.messages, action.id),
				operationError: false
			};
		case UPDATE_MESSAGE_STATUS_ERROR:
			return {
				...state,
				operationError: true
			};
        default:
            return state;
    }
}

module.exports = reducer;
