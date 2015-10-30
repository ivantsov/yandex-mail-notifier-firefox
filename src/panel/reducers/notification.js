const {UPDATE_MESSAGE_STATUS_ERROR} = require('../constants');

function reducer(state = 0, action) {
    switch (action.type) {
		case UPDATE_MESSAGE_STATUS_ERROR:
			return state + 1;
        default:
            return state;
    }
}

module.exports = reducer;
