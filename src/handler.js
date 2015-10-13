var _ = require('sdk/l10n').get;
var {prefs} = require('sdk/simple-prefs');
var {icon, iconGray} = require('./config');
var {setState} = require('./ui/button');
var {playSound} = require('./workers/sound');
var {notify} = require('./ui/notification');

function getUnreadMsgCount(unreadFolders) {
    var {folders} = prefs;
    var unreadMsgCount;

    if (folders) {
        const checkFolders = folders.split(',').map(item => item.toLowerCase().replace(/\s+/g, ''));

        unreadMsgCount = checkFolders.reduce((count, name) => unreadFolders[name] ? count + unreadFolders[name] : count, 0);
    }
    else {
        unreadMsgCount = Object.keys(unreadFolders).reduce((count, name) => count + unreadFolders[name], 0);
    }

    return unreadMsgCount;
}

function onSuccess(unreadFolders) {
    var unreadMsgCount = getUnreadMsgCount(unreadFolders);

    setState({
        badge: unreadMsgCount || null,
        icon
    });

    if (unreadMsgCount > 0) {
        const {messageNotification, messageSound} = prefs;

        if (messageNotification) {
            notify({
                title: _('msgNotificationTitle', unreadMsgCount),
                text: _('msgNotificationText', unreadMsgCount)
            });
        }

        if (messageSound) {
            playSound();
        }
    }
}

function onError() {
    const {notAuthNotification, notAuthSound} = prefs;

    setState({
        badge: null,
        icon: iconGray
    });

    if (notAuthNotification) {
        notify({
            title: _('notAuthNotificationTitle'),
            text: _('notAuthNotificationText')
        });
    }

    if (notAuthSound) {
        playSound();
    }
}

module.exports = {
    onSuccess,
    onError
};
