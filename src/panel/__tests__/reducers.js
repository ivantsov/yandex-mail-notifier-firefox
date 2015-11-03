jest.dontMock('../reducers/messages');
jest.dontMock('../reducers/notification');
jest.dontMock('../reducers/user');

const {
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_STATUS_SUCCESS
} = require('../constants');

describe('reducers', () => {
    describe('messages', () => {
        const reducer = require('../reducers/messages');
        const initialState = {
            unreadCount: 0,
            items: [],
            loading: true,
            error: false
        };

        it('defined', () => {
            expect(reducer).toBeDefined();
        });

        it('initial state', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });

        it('load messages', () => {
            expect(reducer(undefined, {type: LOAD_MESSAGES})).toEqual(initialState);
        });

        it('load messages success', () => {
            const data = {
                unreadCount: 5,
                items: [1, 2, 3]
            };

            expect(reducer(undefined, {
                type: LOAD_MESSAGES_SUCCESS,
                data
            })).toEqual({
                ...initialState,
                loading: false,
                unreadCount: data.unreadCount,
                items: data.items
            });
        });

        it('load messages error', () => {
            expect(reducer(undefined, {
                type: LOAD_MESSAGES_ERROR
            })).toEqual({
                ...initialState,
                loading: false,
                error: true
            });
        });

        it('update message status success', () => {
            const state = {
                ...initialState,
                items: [{id: '123'}, {id: '456'}, {id: '789'}],
                unreadCount: 3
            };

            expect(reducer(state, {
                type: UPDATE_MESSAGE_STATUS_SUCCESS,
                id: '456'
            })).toEqual({
                ...initialState,
                unreadCount: 2,
                items: [{id: '123'}, {id: '789'}]
            });
        });
    });
});
