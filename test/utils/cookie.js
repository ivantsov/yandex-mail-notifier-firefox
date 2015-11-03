const {Cc, Ci: {nsICookieService, nsIIOService}} = require('chrome');
const {setCookieString} = Cc['@mozilla.org/cookieService;1'].getService(nsICookieService);
const {newURI} = Cc['@mozilla.org/network/io-service;1'].getService(nsIIOService);
const {DOMAIN} = require('../../src/config');
const {getCookie} = require('../../src/utils/cookie');
const uri = newURI(DOMAIN, null, null);

function setCookie(cookie) {
	cookie.forEach(({key, value}) => setCookieString(uri, null, `${key}=${value}`, null));
}

const tests = {
	getCookieIsDefined(assert) {
		assert.ok(typeof getCookie !== 'undefined');
	},
	getCookie1(assert) {
		const cookie = [{
			key: 'cookieKey',
			value: 'cookieValue'
		}];

		assert.ok(getCookie(cookie[0].key) === undefined);

		setCookie(cookie);

		assert.ok(getCookie(cookie[0].key) === cookie[0].value);
	},
	getCookie2(assert) {
		const cookie = [{
			key: 'cookieKey1',
			value: 'cookieValue1'
		}, {
			key: 'cookieKey2',
			value: 'cookieValue2'
		}];

		assert.ok(getCookie(cookie[0].key) === undefined);
		assert.ok(getCookie(cookie[1].key) === undefined);

		setCookie(cookie);

		console.log('COOOKIE2', getCookie(cookie[1].key));

		assert.ok(getCookie(cookie[0].key) === cookie[0].value);
		assert.ok(getCookie(cookie[1].key) === cookie[1].value);
	}
};

module.exports = tests;
