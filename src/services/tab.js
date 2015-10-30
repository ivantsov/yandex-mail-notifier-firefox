const {open} = require('sdk/tabs');
const {DOMAIN} = require('../config');

module.exports.openTab = function (url) {
    open(`${DOMAIN}/${url || ''}`);
};
