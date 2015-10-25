const {Panel} = require('sdk/panel');

const panel = Panel({
    width: 700,
    height: 415,
    contentURL: './panel/index.html',
    contentScriptFile: './panel/index.js',
    contentScriptWhen: 'ready',
    contentStyleFile: './panel/styles.css'
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

panel.on('hide', () => {
    panel.port.emit('hide');
});

module.exports = {
    showPanel,
    isShown
};
