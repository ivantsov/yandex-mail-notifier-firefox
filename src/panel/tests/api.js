jest.unmock('../api');

import {
    MESSAGES_URL,
    MESSAGE_ACTION_URL
} from '../../config';
import api from '../api';
import request from '../utils/request';
import parse from '../utils/parser';

const {
    loadMessages,
    updateMessageStatus
} = api;

const {
    get,
    post
} = request;

describe('api', () => {
    it('defined', () => {
        expect(loadMessages).toBeDefined();
        expect(updateMessageStatus).toBeDefined();
    });

    pit('load messages', () => {
        const getExpected = 'somedata';

        get.mockReturnValue(Promise.resolve(getExpected));

        return loadMessages().then(() => {
            expect(get).lastCalledWith(MESSAGES_URL);
            expect(parse).lastCalledWith(getExpected);
        });
    });

    describe('update message status', () => {
        const params = {
            id: '123',
            oper: 'delete'
        };

        beforeEach(post.mockClear);

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

                    expect(post).lastCalledWith({
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

                    expect(post).lastCalledWith({
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
