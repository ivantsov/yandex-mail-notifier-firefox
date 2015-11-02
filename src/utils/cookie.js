const querystring = require('sdk/querystring');
const {Cc, Ci: {nsICookieService, nsIIOService}} = require('chrome');
const {getCookieString} = Cc['@mozilla.org/cookieService;1'].getService(nsICookieService);
const {newURI} = Cc['@mozilla.org/network/io-service;1'].getService(nsIIOService);
const {DOMAIN} = require('../config');

function getCookie(key) {
    const uri = newURI(DOMAIN, null, null);
    const cookiesString = getCookieString(uri, null);
    const cookiePairs = querystring.parse(cookiesString, '; ', '=');

    return cookiePairs[key];
}

module.exports.getCookie = getCookie;
