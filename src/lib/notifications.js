var notifications = require('sdk/notifications');

function notify(notification, cb) {
    notifications.notify({
        title: notification.title,
        text: notification.text,
        onClick: cb
    });
}

exports.notify = notify;