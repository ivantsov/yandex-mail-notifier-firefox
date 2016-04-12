jest.unmock('../actions');

import {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_STATUS_SUCCESS,
    UPDATE_MESSAGE_STATUS_ERROR
} from '../constants';
import api from '../api';
import actions from '../actions';

const {
    loadMessages,
    updateMessageStatus
} = actions;

const errorRes = {
    message: 'test',
    stack: 'stack'
};

window.console = {
    error: jest.fn()
};

describe('api', () => {
    it('defined', () => {
        expect(loadMessages).toBeDefined();
        expect(updateMessageStatus).toBeDefined();
    });

    describe('loadMessages', () => {
        function checkCase(promise, dispatch) {
            api.loadMessages.mockReturnValue(promise);

            loadMessages()(dispatch);

            expect(dispatch).lastCalledWith({type: LOAD_MESSAGES});
            expect(api.loadMessages).toBeCalled();
        }

        beforeEach(api.loadMessages.mockClear);

        pit('success', () => {
            const expected = {
                items: [1, 2, 3],
                unreadCount: 3
            };
            const promise = Promise.resolve(expected);
            const dispatch = jest.fn();

            checkCase(promise, dispatch);

            return promise.then(() => {
                expect(dispatch).lastCalledWith({
                    type: LOAD_MESSAGES_SUCCESS,
                    data: expected
                });
            }).catch(fail);
        });

        pit('error', () => {
            const promise = Promise.reject(errorRes);
            const dispatch = jest.fn();

            checkCase(promise, dispatch);

            return promise
                .then(fail)
                .catch(() => {
                    expect(dispatch).lastCalledWith({type: LOAD_MESSAGES_ERROR});
                    expect(console.error).lastCalledWith(errorRes.message, errorRes.stack); // eslint-disable-line no-console
                });
        });
    });

    describe('updateMessageStatus', () => {
        function checkCase({
            promise,
            dispatch,
            expected
        }) {
            api.updateMessageStatus.mockReturnValue(promise);

            updateMessageStatus(expected)(dispatch);

            expect(api.updateMessageStatus).lastCalledWith(expected);
        }

        beforeEach(api.updateMessageStatus.mockClear);

        pit('success', () => {
            const expected = {id: 1};
            const promise = Promise.resolve();
            const dispatch = jest.fn();

            checkCase({
                promise,
                dispatch,
                expected
            });

            return promise.then(() => {
                expect(dispatch).lastCalledWith({
                    type: UPDATE_MESSAGE_STATUS_SUCCESS,
                    id: expected.id
                });
            }).catch(fail);
        });

        pit('error', () => {
            const promise = Promise.reject();
            const dispatch = jest.fn();

            checkCase({
                promise,
                dispatch
            });

            return promise
                .then(fail)
                .catch(() => {
                    expect(dispatch).lastCalledWith({type: UPDATE_MESSAGE_STATUS_ERROR});
                    expect(console.error).lastCalledWith(errorRes.message, errorRes.stack); // eslint-disable-line no-console
                });
        });
    });
});
