const {createStore, applyMiddleware} = require('redux');
const thunkMiddleware = require('redux-thunk');
const reducers = require('./reducers');

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

module.exports = function(initialState) {
	return createStoreWithMiddleware(reducers, initialState);
};
