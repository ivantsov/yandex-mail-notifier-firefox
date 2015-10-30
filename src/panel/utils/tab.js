function openTab(url) {
    self.port.emit('openTab', url);
}

module.exports.openTab = openTab;
