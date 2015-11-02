const _ = require('sdk/l10n').get;
const {prefs} = require('sdk/simple-prefs');
const {ActionButton} = require('sdk/ui/button/action');
const {Class} = require('sdk/core/heritage');
const {ID, ICON, ICON_GRAY} = require('../config');
const {openTab} = require('../utils/tab');
const observer = require('../observer');
const panel = require('./panel');

const Button = Class({
    initialize() {
        this.button = ActionButton({
            id: ID,
            icon: ICON_GRAY,
            label: _('buttonLabel'),
            onClick: () => this.onClick()
        });

        this.addListeners();
    },
    addListeners() {
        observer.addListener([
            'logout',
            'socket:error'
        ], () => {
            this.button.badge = null;
            this.button.icon = ICON_GRAY;
        });

        observer.addListener([
            'socket:success',
            'unreadCountChanged',
            'newMessage'
        ], ({unreadCount}) => {
            this.button.badge = unreadCount || null;
            this.button.icon = ICON;
        });
    },
    onClick() {
        prefs.showPanel && observer.getState().user ? panel.showPanel(this.button) : openTab();
    }
});

module.exports = new Button();
