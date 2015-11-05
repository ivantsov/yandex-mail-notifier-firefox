const _ = require('sdk/l10n').get;
const {prefs} = require('sdk/simple-prefs');
const {notify} = require('sdk/notifications');
const {setInterval, clearInterval} = require('sdk/timers');
const {Class} = require('sdk/core/heritage');
const {NOT_AUTH_NOTIFICATION_INTERVAL} = require('../config');
const observer = require('../observer');
const {openTab} = require('../utils/tab');

const NotificationService = Class({
    initialize() {
        this.notAuthTimer = null;
        this.unreadTimer = null;

        this.addListeners();
    },
    addListeners() {
        observer.addListener('login', this.disableNotAuth);
        observer.addListener('logout', () => {
            //this.disableUnread();
            this.enableNotAuth();
        });
        observer.addListener('newMessage', this.showNewMessage);
        //observer.addListener('socket:success', this.enableUnread);
        //observer.addListener('socket:error', this.disableUnread);
    },
    showNotAuth() {
        notify({
            title: _('notAuthNotificationTitle'),
            text: _('notAuthNotificationText'),
            onClick: openTab
        });
    },
    showUnreadCount() {
        const unreadCount = observer.getState().unreadCount;

        if (unreadCount > 0) {
            notify({
                title: _('msgNotificationTitle', unreadCount),
                text: _('msgNotificationText', unreadCount),
                onClick: openTab
            });
        }
    },
    showNewMessage({newMessage}) {
        if (prefs.newMessageNotification) {
            const {id, from, subject, firstline} = newMessage;

            notify({
                title: _('newMessageNotificationTitle', from),
                text: `${subject}\n${firstline}`,
                onClick() {
                    openTab(`#message/${id}`);
                }
            });
        }
    },
    enableNotAuth() {
        this.showNotAuth();

        this.notAuthTimer = setInterval(this.showNotAuth, NOT_AUTH_NOTIFICATION_INTERVAL);
    },
    disableNotAuth() {
        clearInterval(this.notAuthTimer);
    },
    enableUnread() {
        this.showUnreadCount();

        this.unreadTimer = setInterval(showUnreadCount, NOT_AUTH_NOTIFICATION_INTERVAL);
    },
    disableUnread() {
        clearInterval(this.unreadTimer);
    }
});

module.exports = new NotificationService();
