const _ = require('sdk/l10n').get;
const {setTimeout} = require('sdk/timers');
const {Panel} = require('sdk/panel');
const {openTab} = require('../utils/tab');
const observer = require('../observer');

const panel = Panel({
    width: 700,
    height: 415,
    contentURL: './panel/index.html',
    contentScriptFile: './panel/index.js',
    contentScriptWhen: 'ready',
    contentStyleFile: './panel/styles.css',
    contentScriptOptions: {
        l10n: {
            compose: _('compose'),
            markRead: _('markRead'),
            spam: _('spam'),
            remove: _('remove'),
            month1: _('month1'),
            month2: _('month2'),
            month3: _('month3'),
            month4: _('month4'),
            month5: _('month5'),
            month6: _('month6'),
            month7: _('month7'),
            month8: _('month8'),
            month9: _('month9'),
            month10: _('month10'),
            month11: _('month11'),
            month12: _('month12'),
            emptyList: _('emptyList'),
            loadingError: _('loadingError'),
            operationError: _('operationError')
        }
    },
    onShow() {
        const {user, unreadCount} = observer.getState();

        panel.port.emit('show', {
            user,
            messages: {unreadCount}
        });
    },
    onHide() {
        panel.port.emit('hide');
    }
});

panel.port.on('openTab', (url) => {
    panel.hide();

    openTab(url);
});

function showPanel(position) {
    // hack - https://github.com/ivantsov/yandex-mail-notifier/issues/2
    setTimeout(() => panel.show({position}), 300);
}

module.exports.showPanel = showPanel;
