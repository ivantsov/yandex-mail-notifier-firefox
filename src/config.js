const DOMAIN = 'https://mail.yandex.ru';
const API_URL = `${DOMAIN}/api/`;

module.exports = {
    ID: 'yandex-mail-notifier',
    ICON: './icon.png',
    ICON_GRAY: './icon-gray.png',
    DOMAIN,
    API_URL,
    UNREAD_MESSAGE_URL: `${API_URL}/v2/bar/counters?silent`,
    IGNORED_FOLDERS: ['spam', 'archive', 'trash', 'sent', 'outbox', 'draft'],
    RECONNECT_INTERVAL: 60 * 1000, // 1 min
    SOCKET: {
        CREDENTIALS_URL: `${DOMAIN}/neo2/handlers/xiva_sub.jsx`,
        URL: 'wss://xiva-daria.mail.yandex.net/events/websocket/',
        RECONNECT_INTERVAL: 30 * 60 * 1000 //30 min
    },
    COOKIE: {
        HOST: '.yandex.ru',
        SESSION_ID: 'Session_id',
        UID: 'yandexuid',
        PATH: '/',
        TIMEOUT: 1000
    }
};
