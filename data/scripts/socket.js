let WS;
const emitEvent = self.port.emit;
const addListener = self.port.on;

function onOpen() {
    console.log('Socket opened', arguments); // eslint-disable-line no-console
}

function onClose() {
    console.error('Socket closed', arguments); // eslint-disable-line no-console

    emitEvent('reconnect');
}

function onError() {
    console.error('Error occurred in socket', arguments); // eslint-disable-line no-console

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

    console.log(jsonData);

    const {operation, message} = jsonData;

    if (operation !== 'ping') {
        message && message.new_messages ? emitEvent('newMessage', message) : emitEvent('changeStatus');
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
