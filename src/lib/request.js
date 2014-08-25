var self = require('sdk/self'),
    pageWorkers = require('sdk/page-worker');

function get(url, script, cb) {
    pageWorkers.Page({
        contentURL: url,
        contentScriptFile: script,
        contentScriptWhen: 'ready',
        onMessage: cb
    });
}

exports.get = get;