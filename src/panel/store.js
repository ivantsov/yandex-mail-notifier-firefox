const {createStore, applyMiddleware} = require('redux');
const thunkMiddleware = require('redux-thunk');
const rootReducer = require('./reducers');

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

module.exports = function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
};
