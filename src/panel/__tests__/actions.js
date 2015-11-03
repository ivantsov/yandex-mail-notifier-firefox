jest.dontMock('../actions');

const {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_STATUS_SUCCESS,
    UPDATE_MESSAGE_STATUS_ERROR
} = require('../constants');
const api = require('../api');
const {loadMessages, updateMessageStatus} = require('../actions');

describe('api', () => {
    it('defined', () => {
        expect(loadMessages).toBeDefined();
        expect(updateMessageStatus).toBeDefined();
    });

    describe('load messages', () => {
        const dispatch = jest.genMockFn();

        afterEach(api.loadMessages.mockClear);

        pit('success', () => {
            const expected = {
                items: [1, 2, 3],
                unreadCount: 3
            };
            const promise = Promise.resolve(expected);

            api.loadMessages.mockImpl(() => promise);

            loadMessages()(dispatch);

            expect(dispatch).toBeCalledWith({type: LOAD_MESSAGES});
            expect(api.loadMessages).toBeCalled();

            return promise
                .then(() => {
                    expect(dispatch).toBeCalledWith({
                        type: LOAD_MESSAGES_SUCCESS,
                        data: expected
                    });
                })
                .catch(() => expect(false).toBeTruthy());
        });

        pit('error', () => {
            const promise = Promise.reject();

            api.loadMessages.mockImpl(() => promise);

            loadMessages()(dispatch);

            expect(dispatch).toBeCalledWith({type: LOAD_MESSAGES});
            expect(api.loadMessages).toBeCalled();

            return promise
                .then(() => expect(false).toBeTruthy())
                .catch(() => expect(dispatch).toBeCalledWith({type: LOAD_MESSAGES_ERROR}));
        });
    });

    describe('update message status', () => {
        const dispatch = jest.genMockFn();

        afterEach(api.updateMessageStatus.mockClear);

        pit('success', () => {
            const expected = {id: 1};
            const promise = Promise.resolve();

            api.updateMessageStatus.mockImpl(() => promise);

            updateMessageStatus(expected)(dispatch);

            expect(api.updateMessageStatus).toBeCalledWith(expected);

            return promise
                .then(() => {
                    expect(dispatch).toBeCalledWith({
                        type: UPDATE_MESSAGE_STATUS_SUCCESS,
                        id: expected.id
                    });
                })
                .catch(() => expect(false).toBeTruthy());
        });

        pit('error', () => {
            const promise = Promise.reject();

            api.updateMessageStatus.mockImpl(() => promise);

            updateMessageStatus()(dispatch);

            expect(api.updateMessageStatus).toBeCalled();

            return promise
                .then(() => expect(false).toBeTruthy())
                .catch(() => expect(dispatch).toBeCalledWith({type: UPDATE_MESSAGE_STATUS_ERROR}));
        });
    });
});
