var {Page} = require('sdk/page-worker');
var {parseURL} = require('../config');
var {onSuccess, onError} = require('../handler');

module.exports = () => {
    var worker = Page({
        contentURL: parseURL,
        contentScriptFile: './parser.js',
        contentScriptWhen: 'ready'
    });

    worker.port
        .on('newMessages', onSuccess)
        .on('notAuth', onError);
};