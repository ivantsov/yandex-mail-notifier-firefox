import {IGNORED_FOLDERS} from '../../config';

function getText(element, selector) {
    return element.querySelector(selector).textContent;
}

function getFilteredMessage(messages, folders) {
    return messages.filter(({fid}) => {
        const folder = folders.find(({id}) => id === fid);

        return (!folder || IGNORED_FOLDERS.indexOf(folder.symbol) < 0);
    });
}

function parseFolders(folders) {
    return [...folders].map(folder => {
        return {
            id: getText(folder, 'fid'),
            symbol: getText(folder, 'symbol')
        };
    });
}

function parseMessages(messages) {
    return [...messages].map(message => {
        const from = message.querySelector('from');
        let subject = getText(message.querySelector('subject'), 'text');

        if (subject === 'No subject') {
            subject = '';
        }

        return {
            subject,
            id: message.getAttribute('mid'),
            from: getText(from, 'name') || getText(from, 'email'),
            firstline: getText(message, 'firstline'),
            date: new Date(message.getAttribute('recv_date')),
            fid: message.getAttribute('fid')
        };
    });
}

export default xml => {
    let messages = xml.querySelector('mailbox_list');
    let folders = xml.querySelector('folder_list');

    if (!messages || !folders) {
        throw new Error('Bad response format in messages xml');
    }

    const error = messages.querySelector('error');

    if (error) {
        throw new Error(`Messages xml has error field with code: ${error.getAttribute('code')}`);
    }

    const details = messages.querySelector('details');
    const unreadCount = parseInt(details.getAttribute('msg_count'), 10);

    messages = parseMessages(messages.querySelectorAll('message'));
    folders = parseFolders(folders.querySelectorAll('folder'));

    messages = getFilteredMessage(messages, folders);

    return {
        unreadCount,
        items: messages
    };
};
