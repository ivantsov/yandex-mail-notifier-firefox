import {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_STATUS_SUCCESS
} from '../constants';

const initialState = {
    unreadCount: 0,
    items: [],
    loading: true,
    error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                loading: true
            };
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
                error: true
            };
        case UPDATE_MESSAGE_STATUS_SUCCESS:
            return {
                ...state,
                unreadCount: state.unreadCount - 1,
                items: state.items.filter(({id}) => id !== action.id)
            };
        default:
            return {
                ...initialState,
                ...state
            };
    }
};
