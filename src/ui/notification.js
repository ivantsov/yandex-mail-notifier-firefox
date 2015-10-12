var {notify} = require('sdk/notifications');
var {openTab} = require('./tab');

module.exports.notify = ({title, text}) => {
    notify({
        title,
        text,
        onClick: openTab
    });
};
