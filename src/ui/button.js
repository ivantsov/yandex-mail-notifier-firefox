const _ = require('sdk/l10n').get;
const {prefs} = require('sdk/simple-prefs');
const {ActionButton} = require('sdk/ui/button/action');
const {ID, ICON, ICON_GRAY} = require('../config');
const {openTab} = require('../utils/tab');
const observer = require('../observer');
const {showPanel} = require('./panel');

const button = ActionButton({
    id: ID,
    icon: ICON_GRAY,
    label: _('buttonLabel'),
    badgeColor: '#3d5afe',
    onClick() {
        prefs.showPanel && observer.getState().user ? showPanel(button) : openTab();
    }
});

function init() {
    observer.addListener([
        'logout',
        'socket:error'
    ], () => {
        button.badge = null;
        button.icon = ICON_GRAY;
    });

    observer.addListener([
        'socket:success',
        'unreadCountChanged',
        'newMessage'
    ], ({unreadCount}) => {
        button.badge = unreadCount || null;
        button.icon = ICON;
    });
}

module.exports = init;
