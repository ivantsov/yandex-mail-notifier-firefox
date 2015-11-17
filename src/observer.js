const {EventTarget} = require('sdk/event/target');
const {emit} = require('sdk/event/core');

const observer = EventTarget();
let state = {
    user: null,
    unreadCount: 0,
    newMessage: null
};

function addListener(eventName, handler) {
    if (Array.isArray(eventName)) {
        eventName.forEach(name => observer.on(name, handler));
    }
    else {
        observer.on(eventName, handler);
    }
}

function emitEvent(eventName, params) {
    state = Object.assign({}, state, params);

    emit(observer, eventName, state);
}

function getState() {
    return state;
}

module.exports = {
    addListener,
    emitEvent,
    getState
};
