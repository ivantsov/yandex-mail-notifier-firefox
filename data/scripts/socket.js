let WS;
const emitEvent = self.port.emit;
const addListener = self.port.on;

function onOpen(...args) {
    console.log('Socket opened', args); // eslint-disable-line no-console
}

function onClose(...args) {
    console.error('Socket closed', args); // eslint-disable-line no-console

    emitEvent('reconnect');
}

function onError(...args) {
    console.error('Error occurred in socket', args); // eslint-disable-line no-console

    emitEvent('reconnect');
}

function onMessage({data}) {
    let jsonData;

    try {
        jsonData = JSON.parse(data);
    }
    catch (err) {
        throw err;
    }

    const {operation, message} = jsonData;

    if (operation !== 'ping') {
        emitEvent('updateUnreadCount', message);
    }
}

function connect({sign, ts, uid}) {
    WS = new WebSocket(`wss://xiva-daria.mail.yandex.net/events/websocket?sign=${sign}&ts=${ts}&uid=${uid}&client_id=bar&service=mail&format=json`);

    WS.addEventListener('open', onOpen, false);
    WS.addEventListener('close', onClose, false);
    WS.addEventListener('message', onMessage, false);
    WS.addEventListener('error', onError, false);
}

function disconnect() {
    if (WS) {
        WS.close();

        WS.removeEventListener('open', onOpen, false);
        WS.removeEventListener('close', onClose, false);
        WS.removeEventListener('message', onMessage, false);
        WS.removeEventListener('error', onError, false);
    }
}

addListener('connect', connect);
addListener('disconnect', disconnect);
