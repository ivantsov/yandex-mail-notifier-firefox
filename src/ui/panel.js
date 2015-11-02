const _ = require('sdk/l10n').get;
const {Panel} = require('sdk/panel');
const {Class} = require('sdk/core/heritage');
const {openTab} = require('../utils/tab');
const observer = require('../observer');

const CustomPanel = Class({
    initialize() {
        this.panel = Panel({
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
            onShow: () => this.onShow(),
            onHide: () => this.onHide()
        });

        this.addListeners();
    },
    addListeners() {
        this.panel.port.on('openTab', (url) => {
            this.panel.hide();

            openTab(url);
        });
    },
    onShow() {
        const {user, unreadCount} = observer.getState();

        this.panel.port.emit('show', {
            user,
            messages: {unreadCount}
        });
    },
    onHide() {
        this.panel.port.emit('hide');
    },
    showPanel(position) {
        this.panel.show({position});
    }
});

module.exports = new CustomPanel();
