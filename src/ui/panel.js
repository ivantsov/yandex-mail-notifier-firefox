const {Panel} = require('sdk/panel');

const panel = Panel({
    width: 700,
    height: 415,
    contentURL: './panel/index.html',
    contentScriptFile: './panel/index.js',
    contentScriptWhen: 'start'
});

function showPanel(position) {
    panel.show({position});
}

function isShown() {
    return panel.isShowing;
}

panel.on('show', () => {
    panel.port.emit('show');
});

module.exports = {
    showPanel,
    isShown
};
