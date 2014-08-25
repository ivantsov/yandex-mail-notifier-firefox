'use strict';

var {Cc, Ci} = require('chrome');
var unload = require('sdk/system/unload').when;
var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);

function getURI(aURL) Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).newURI(aURL, null, null);

function setOptions(url, options) {
    var newOptions = {};

    options = options || {};
    newOptions.uri = getURI(url);
    newOptions.type = (options.type || 'user').toLowerCase();
    newOptions.type = (newOptions.type == 'agent') ? sss.AGENT_SHEET : sss.USER_SHEET;

    return newOptions;
}

var loadSS = exports.load = function loadSS(url, options) {
    var {uri, type} = setOptions(url, options);

    sss.loadAndRegisterSheet(uri, type);
    unload(unregisterSS.bind(null, url, options));
};

var registeredSS = exports.registered = function registeredSS(url, options) {
    var {uri, type} = setOptions(url, options);

    return !!sss.sheetRegistered(uri, type);
};

var unregisterSS = exports.unload = function unregisterSS(url, options) {
    var {uri, type} = setOptions(url, options);

    sss.unregisterSheet(uri, type);
};