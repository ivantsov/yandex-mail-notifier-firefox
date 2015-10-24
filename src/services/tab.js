var {open} = require('sdk/tabs');
var {DOMAIN} = require('../config');

module.exports.openTab = () => open(DOMAIN);
