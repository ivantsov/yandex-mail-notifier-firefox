var _ = require('sdk/l10n').get;
var {ActionButton} = require('sdk/ui/button/action');
var {id, label, icon} = require('../config');
var {openTab} = require('./tab');

var button;

function init() {
    button = ActionButton({
        id,
        icon,
        label: _('buttonLabel'),
        onClick: openTab
    });
}

function setState(newState) {
    button.state(button, newState);
}

module.exports = {
    init,
    setState
};