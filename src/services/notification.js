const _ = require('sdk/l10n').get;
const prefs = require('sdk/simple-prefs');
const {notify} = require('sdk/notifications');
const {setInterval, clearInterval} = require('sdk/timers');
const {NOT_AUTH_NOTIFICATION_INTERVAL} = require('../config');
const observer = require('../observer');
const {openTab} = require('../utils/tab');

let unreadTimer = null;
let notAuthTimer = null;

function showNewMessage({newMessage}) {
    if (prefs.prefs.newMessageNotification) {
        const {id, from, subject, firstline} = newMessage;

        notify({
            title: _('newMessageNotificationTitle', from),
            text: `${subject}\n${firstline}`,
            onClick() {
                openTab(`#message/${id}`);
            }
        });
    }
}

function disableUnread() {
    clearInterval(unreadTimer);
}

function enableUnread({user}) {
    if (prefs.prefs.unreadMessagesNotification && user) {
        disableUnread();

        unreadTimer = setInterval(() => {
            const unreadCount = observer.getState().unreadCount;

            if (unreadCount > 0) {
                notify({
                    title: _('unreadMsgNotificationTitle', unreadCount),
                    text: _('unreadMsgNotificationText', unreadCount),
                    onClick: openTab
                });
            }
        }, prefs.prefs.unreadMessagesNotification);
    }
}

function disableNotAuth() {
    clearInterval(notAuthTimer);
}

function enableNotAuth({user}) {
    if (prefs.prefs.notAuthNotification && !user) {
        disableNotAuth();

        notAuthTimer = setInterval(() => {
            notify({
                title: _('notAuthNotificationTitle'),
                text: _('notAuthNotificationText'),
                onClick: openTab
            });
        }, NOT_AUTH_NOTIFICATION_INTERVAL);
    }
}


function init() {
    // new message notifications
    observer.addListener('newMessage', showNewMessage);

    // unread notifications
    observer.addListener('socket:success', enableUnread);
    observer.addListener('logout', disableUnread);

    prefs.on('unreadMessagesNotification', () => {
        const state = observer.getState();

        prefs.prefs.unreadMessagesNotification ? enableUnread(state) : disableUnread(state);
    });

    // not auth notifications
    observer.addListener('login', disableNotAuth);
    observer.addListener('logout', enableNotAuth);

    prefs.on('notAuthNotification', () => {
        const state = observer.getState();

        prefs.prefs.notAuthNotification ? enableNotAuth(state) : disableNotAuth(state);
    });
}

module.exports = init;
