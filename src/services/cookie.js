const events = require('sdk/system/events');
const querystring = require('sdk/querystring');
const {Cc, Ci} = require('chrome');
const {nsICookieService, nsIIOService, nsICookie2} = Ci;
const {getCookieString} = Cc['@mozilla.org/cookieService;1'].getService(nsICookieService);
const {newURI} = Cc['@mozilla.org/network/io-service;1'].getService(nsIIOService);
const {DOMAIN, COOKIE: {SESSION_ID, HOST, PATH}} = require('../config');

function getCookie(key) {
	const uri = newURI(DOMAIN, null, null);
	const cookiesString = getCookieString(uri, null);
	const cookiePairs = querystring.parse(cookiesString, '; ', '=');

	return cookiePairs[key];
}

function addChangeListener(handler) {
	events.on('cookie-changed', ({data, subject}) => {
		const {name, host, path} = subject.QueryInterface(nsICookie2);

		if (name === SESSION_ID && host === HOST && path === PATH) {
			handler(data === 'added');
		}
	}, true);
}

module.exports = {
	getCookie,
	addChangeListener
};
