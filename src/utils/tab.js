const {open} = require('sdk/tabs');
const {DOMAIN} = require('../config');

function openTab(url) {
    open(`${DOMAIN}/${url || ''}`);
}

module.exports.openTab = openTab;
