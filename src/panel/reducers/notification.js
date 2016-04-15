import {UPDATE_MESSAGE_STATUS_ERROR} from '../constants';

export default (state = 0, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_STATUS_ERROR:
            return state + 1;
        default:
            return state;
    }
};
