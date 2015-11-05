const DOMAIN = 'https://mail.yandex.ru';
const API_URL = `${DOMAIN}/api/`;

module.exports = {
    ID: 'yandex-mail-notifier',
    ICON: './icons/logo.png',
    ICON_GRAY: './icons/logo-gray.png',
    DOMAIN,
    API_URL,
    UNREAD_MESSAGE_URL: `${API_URL}/v2/bar/counters?silent`,
    MESSAGES_URL: 'mailbox_list?first=0&last=100&extra_cond=only_new&goto=all',
    MESSAGE_ACTION_URL: 'mailbox_oper',
    IGNORED_FOLDERS: [
        'spam',
        'archive',
        'trash',
        'sent',
        'outbox',
        'draft'
    ],
    RECONNECT_INTERVAL: 60 * 1000, // 1 min
    ERROR_NOTIFICATION_TIMEOUT: 3 * 1000, // 3 sec
    SOCKET: {
        CREDENTIALS_URL: `${DOMAIN}/neo2/handlers/xiva_sub.jsx`,
        URL: 'wss://xiva-daria.mail.yandex.net/events/websocket/',
        RECONNECT_INTERVAL: 29 * 60 * 1000 // 29 min
    },
    COOKIE: {
        HOST: '.yandex.ru',
        SESSION_ID: 'Session_id',
        UID: 'yandexuid',
        PATH: '/',
        TIMEOUT: 1000
    }
};
