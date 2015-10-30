const _ = require('sdk/l10n').get;
const {prefs} = require('sdk/simple-prefs');
const {ActionButton} = require('sdk/ui/button/action');
const {ID, ICON, ICON_GRAY} = require('../config');
const {addHandler, getState} = require('../observer');
const {openTab} = require('../services/tab');
const {showPanel} = require('./panel');

function init() {
    const button = ActionButton({
        id: ID,
        icon: ICON_GRAY,
        label: _('buttonLabel'),
        onClick() {
            prefs.showPanel && getState().user ? showPanel(button) : openTab();
        }
    });

    addHandler(({user, unreadCount}) => {
        button.state(button, {
            badge: unreadCount || null,
            icon: user ? ICON : ICON_GRAY
        });
    });
}

module.exports.init = init;
