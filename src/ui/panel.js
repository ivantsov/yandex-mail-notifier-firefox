const _ = require('sdk/l10n').get;
const {Panel} = require('sdk/panel');
const {getState} = require('../observer');

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
            reply: _('reply'),
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
            month12: _('month12')
        }
    },
    onShow() {
        panel.port.emit('show', getState().user);
    },
    onHide() {
        panel.port.emit('hide');
    }
});

function showPanel(position) {
    panel.show({position});
}

function isShown() {
    return panel.isShowing;
}

module.exports = {
    showPanel,
    isShown
};
