const {EventTarget} = require('sdk/event/target');
const {emit} = require('sdk/event/core');
const {Class} = require('sdk/core/heritage');

const Observer = Class({
    initialize() {
        this.observer = EventTarget();

        this.state = {
            user: null,
            unreadCount: 0,
            newMessage: null
        };
    },
    addListener(eventName, handler) {
        if (Array.isArray(eventName)) {
            eventName.forEach(name => this.observer.on(name, handler));
        }
        else {
            this.observer.on(eventName, handler);
        }
    },
    emitEvent(eventName, params) {
        Object.assign(this.state, params);

        emit(this.observer, eventName, this.state);
    },
    getState() {
        return this.state;
    }
});

module.exports = new Observer();
