var {open} = require('sdk/tabs');
var {openURL} = require('../config');

module.exports.openTab = () => open(openURL);