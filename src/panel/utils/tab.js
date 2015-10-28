module.exports.openTab = function (url) {
	self.port.emit('openTab', url);
};
