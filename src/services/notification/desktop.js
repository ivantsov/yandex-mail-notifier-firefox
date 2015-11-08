const _ = require('sdk/l10n').get;
const {prefs} = require('sdk/simple-prefs');
const {notify} = require('sdk/notifications');
const {openTab} = require('../../utils/tab');

function showNewMessage({id, from, subject, firstline}) {
    if (prefs.newMessageNotification) {
        notify({
            title: _('newMessageNotificationTitle', from),
            text: `${subject}\n${firstline}`,
            onClick() {
                openTab(`#message/${id}`);
            }
        });
    }
}

function showUnread(unreadCount) {
    if (prefs.unreadMessagesNotification && unreadCount > 0) {
        notify({
            title: _('unreadMsgNotificationTitle', unreadCount),
            text: _('unreadMsgNotificationText', unreadCount),
            onClick: openTab
        });
    }
}

function showNotAuth() {
    if (prefs.notAuthNotification) {
        notify({
            title: _('notAuthNotificationTitle'),
            text: _('notAuthNotificationText'),
            onClick: openTab
        });
    }
}

module.exports = {
    showNewMessage,
    showUnread,
    showNotAuth
};
