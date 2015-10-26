const xml = require('./parser');
const {IGNORED_FOLDERS} = require('../../../config');

function getFilteredMessage(messages, folders) {
    return messages.filter(({fid}) => {
        const folder = folders.find(({id}) => id === fid);

        return (!folder || IGNORED_FOLDERS.indexOf(folder.symbol) < 0);
    });
}

function parseFolders(folders) {
    return [...xml.selectAll('folder', folders)].map(folder => {
        return {
            id: xml.getText(folder, 'fid'),
            symbol: xml.getText(folder, 'symbol'),
            name: xml.getText(folder, 'name').split('|').pop()
        };
    });
}

function parseMessages(messages) {
    return [...xml.selectAll('message', messages)].map(message => {
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
    });
}

function parse(xmlDoc) {
    let messages = xml.select('mailbox_list', xmlDoc);
    let folders = xml.select('folder_list', xmlDoc);

    if (!messages || !folders) {
        throw new Error('Bad response format in messages xml');
    }

    const error = xml.select('error', messages);

    if (error) {
        throw new Error(`Error occurred while parsing messages xml ${xml.getAttr(error, 'code')}`);
    }

    const details = xml.select('details', messages);
    const unreadCount = parseInt(xml.getAttr(details, 'msg_count'), 10);

    messages = parseMessages(messages);
    folders = parseFolders(folders);

    messages = getFilteredMessage(messages, folders);

    return {
        unreadCount,
        messages
    };
}

module.exports = parse;
