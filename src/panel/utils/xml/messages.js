const xml = require('./parser');

function parseMessage(message) {
    let subject = xml.getText(xml.select('subject', message), 'text');

    if (subject === 'No subject') {
        subject = '';
    }

    return {
        subject,
        id: xml.getAttr(message, 'mid'),
        from: xml.getText(xml.select('from', message), 'name') || xml.getText(xml.select('from', message), 'email'),
        firstline: xml.getText(message, 'firstline'),
        date: new Date(xml.getAttr(message, 'recv_date')),
        attach: parseInt(xml.getAttr(message, 'att_count'), 10),
        fid: xml.getAttr(message, 'fid')
    };
}

function parse(xmlDoc) {
    const list = xml.select('mailbox_list', xmlDoc);

    if (!list) {
        throw new Error('Bad response format in messages xml');
    }

    const error = xml.select('error', list);

    if (error) {
        throw new Error(`Error occurred while parsing messages xml ${xml.getAttr(error, 'code')}`);
    }

    const details = xml.select('details', list);

    return {
        unreadCount: parseInt(xml.getAttr(details, 'msg_count'), 10),
        messages: [...xml.selectAll('message', list)].map(parseMessage)
    };
}

module.exports = parse;
