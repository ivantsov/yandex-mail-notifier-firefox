const {combineReducers} = require('redux');
const user = require('./user');
const messages = require('./messages');
const notification = require('./notification');

module.exports = combineReducers({
    user,
    messages,
    notification
});
