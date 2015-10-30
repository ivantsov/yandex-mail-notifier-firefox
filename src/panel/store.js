const {createStore, applyMiddleware} = require('redux');
const thunkMiddleware = require('redux-thunk');
const reducers = require('./reducers');

function createStoreWithMiddleware(initialState) {
    return applyMiddleware(thunkMiddleware)(createStore)(reducers, initialState);
}

module.exports = createStoreWithMiddleware;
