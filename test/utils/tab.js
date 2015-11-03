const {waitUntil} = require('sdk/test/utils');
const tabs = require('sdk/tabs');
const {DOMAIN} = require('../../src/config');
const {openTab} = require('../../src/utils/tab');

function checkActiveTab(url, assert, done) {
	openTab(url);

	waitUntil(() => tabs.activeTab.url === `${DOMAIN}/${url}`).then(() => {
		assert.pass();

		tabs.activeTab.close();

		done();
	});
}

const tests = {
	openTabIsDefined(assert) {
		assert.ok(typeof openTab !== 'undefined');
	},
	openTabWithoutParams(assert, done) {
		checkActiveTab('', assert, done)
	},
	openTabWithParams1(assert, done) {
		const url = 'test';

		checkActiveTab(url, assert, done)
	},
	openTabWithParams2(assert, done) {
		const url = 'test/123/#hash';

		checkActiveTab(url, assert, done)
	}
};

module.exports = tests;
