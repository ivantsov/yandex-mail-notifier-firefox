jest.unmock('../../../config');
jest.unmock('../parser');

import parse from '../parser';

function createElement(
    name,
    children = [],
    attrs = {}
) {
    const element = document.createElement(name);

    children.forEach(child => element.appendChild(child));

    if (typeof attrs === 'object') {
        Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
    }
    else {
        element.textContent = attrs;
    }

    return element;
}

function getFixtures() {
    const folders = [{
        id: '0123',
        symbol: 'spam'
    }, {
        id: '0234',
        symbol: 'inbox'
    }, {
        id: '0345',
        symbol: 'draft'
    }];

    const messages = [{
        id: '123',
        subject: '',
        from: {
            name: '',
            email: 'sender@test.com 123'
        },
        firstline: 'test message 123',
        date: new Date(),
        fid: folders[0].id
    }, {
        id: '234',
        subject: 'No subject',
        from: {
            name: 'Sender 345',
            email: ''
        },
        firstline: 'test message 234',
        date: new Date(),
        fid: folders[1].id
    }, {
        id: '345',
        subject: 'test subject 345',
        from: {
            name: 'Sender 345',
            email: 'sender@test.com 345'
        },
        firstline: 'test message 345',
        date: new Date(),
        fid: folders[2].id
    }];

    const messageElements = messages.map(({
        id,
        subject,
        from,
        firstline,
        date,
        fid
    }) =>
        createElement('message', [
            createElement('from', [
                createElement('name', [], from.name),
                createElement('email', [], from.email)
            ]),
            createElement('subject', [
                createElement('text', [], subject)
            ]),
            createElement('firstline', [], firstline)
        ], {
            mid: id,
            recv_date: date,
            fid
        })
    );

    const folderElements = folders.map(({id, symbol}) =>
        createElement('folder', [
            createElement('fid', [], id),
            createElement('symbol', [], symbol)
        ])
    );

    return {
        messages,
        messageElements,
        folderElements
    };
}

describe('parse', () => {
    it('defined', () => {
        expect(parse).toBeDefined();
    });

    describe('bad xml', () => {
        it('messages', () => {
            const xml = createElement('doc', [createElement('folder_list')]);

            expect(() => parse(xml)).toThrowError('Bad response format in messages xml');
        });

        it('folders', () => {
            const xml = createElement('doc', [createElement('mailbox_list')]);

            expect(() => parse(xml)).toThrowError('Bad response format in messages xml');
        });

        it('error', () => {
            const errorCode = 500;
            const xml = createElement('doc', [
                createElement('mailbox_list', [
                    createElement('error', [], {code: errorCode})
                ]),
                createElement('folder_list')
            ]);

            expect(() => parse(xml)).toThrowError(`Messages xml has error field with code: ${errorCode}`);
        });
    });

    describe('valid xml', () => {
        it('details and empty messages', () => {
            const expected = 10;

            const xml = createElement('doc', [
                createElement('mailbox_list', [
                    createElement('details', [], {msg_count: expected})
                ]),
                createElement('folder_list')
            ]);

            expect(parse(xml)).toEqual({
                unreadCount: expected,
                items: []
            });
        });

        it('without filtering folders', () => {
            const {messages, messageElements} = getFixtures();

            const xml = createElement('doc', [
                createElement('mailbox_list', [
                    createElement('details', [], {msg_count: 10}),
                    ...messageElements
                ]),
                createElement('folder_list')
            ]);

            const {items} = parse(xml);

            expect(items.length).toBe(messageElements.length);

            items.forEach(({id, from, subject, firstline, date, fid}, index) => {
                let expectedSubject = messages[index].subject;

                if (expectedSubject === 'No subject') {
                    expectedSubject = '';
                }

                expect(id).toBe(messages[index].id);
                expect(from).toBe(messages[index].from.name || messages[index].from.email);
                expect(subject).toBe(expectedSubject);
                expect(firstline).toBe(messages[index].firstline);
                expect(date.toString()).toBe(messages[index].date.toString());
                expect(fid).toBe(messages[index].fid);
            });
        });

        it('with filtering folders', () => {
            const {
                messages,
                messageElements,
                folderElements
            } = getFixtures();

            const xml = createElement('doc', [
                createElement('mailbox_list', [
                    createElement('details', [], {msg_count: 10}),
                    ...messageElements
                ]),
                createElement('folder_list', folderElements)
            ]);

            const {items} = parse(xml);
            const expected = messages[1];
            const result = items[0];

            expect(items.length).toBe(1);

            expect(result.id).toBe(expected.id);
            expect(result.from).toBe(expected.from.name);
            expect(result.subject).toBe('');
            expect(result.firstline).toBe(expected.firstline);
            expect(result.date.toString()).toBe(expected.date.toString());
            expect(result.fid).toBe(expected.fid);
        });
    });
});
