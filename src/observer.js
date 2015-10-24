const {createStore} = require('redux');

const UPDATE_STATE = 'UPDATE_STATE';

const initialState = {
    isAuth: false,
    unreadCount: 0
};

let previousState = initialState;
let handlers = [];

function updateState(data) {
    store.dispatch({
        type: UPDATE_STATE,
        data
    });
}

function updateStateToInitial() {
    store.dispatch({
        type: UPDATE_STATE,
        data: initialState
    });
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_STATE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function isEqual(obj1, obj2) {
    return Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}

const store = createStore(reducer);

store.subscribe(() => {
    const currentState = store.getState();

    if (!isEqual(currentState, previousState)) {
        previousState = currentState;

        handlers.forEach(handler => handler(currentState));
    }
});

function addHandler(handler) {
    handlers.push(handler);
}

module.exports = {
    getState: store.getState,
    addHandler,
    updateState,
    updateStateToInitial
};
