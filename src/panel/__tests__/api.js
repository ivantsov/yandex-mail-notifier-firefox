jest.dontMock('../api');

const {MESSAGES_URL, MESSAGE_ACTION_URL} = require('../../config');
const {loadMessages, updateMessageStatus} = require('../api');
const {get, post} = require('../utils/request');
const parser = require('../utils/parser');

describe('api', () => {
    it('defined', () => {
        expect(loadMessages).toBeDefined();
        expect(updateMessageStatus).toBeDefined();
    });

    pit('load messages', () => {
        const getExpected = 'somedata';

        get.mockImpl(() => Promise.resolve(getExpected));

        return loadMessages().then(() => {
            expect(get).toBeCalledWith(MESSAGES_URL);
            expect(parser).toBeCalledWith(getExpected);
        });
    });

    describe('update message status', () => {
        const params = {
            id: '123',
            oper: 'delete'
        };

        afterEach(post.mockClear);

        pit('with error', () => {
            post.mockImpl(() => {
                const container = document.createElement('div');
                const error = document.createElement('error');

                container.appendChild(error);

                return Promise.resolve(container);
            });

            return updateMessageStatus(params)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined();

                    expect(post).toBeCalledWith({
                        url: MESSAGE_ACTION_URL,
                        params: {
                            ids: [params.id],
                            oper: params.oper
                        }
                    });
                });
        });

        pit('without error', () => {
            post.mockImpl(() => {
                const container = document.createElement('div');

                return Promise.resolve(container);
            });

            return updateMessageStatus(params)
                .then(res => {
                    expect(res).toBeUndefined();

                    expect(post).toBeCalledWith({
                        url: MESSAGE_ACTION_URL,
                        params: {
                            ids: [params.id],
                            oper: params.oper
                        }
                    });
                })
                .catch(err => expect(err).toBeUndefined());
        });
    });
});
