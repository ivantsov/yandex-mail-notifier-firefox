var _ = require('sdk/l10n').get;
var {ActionButton} = require('sdk/ui/button/action');
var {id, icon} = require('../config');
var {openTab} = require('./tab');

// TODO: use ES6 class when it will be released

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
