jest.unmock('../notification');

import {
    UPDATE_MESSAGE_STATUS_SUCCESS,
    UPDATE_MESSAGE_STATUS_ERROR
} from '../../constants';
import reducer from '../notification';

const initialState = 0;

describe('notification', () => {
    it('defined', () => {
        expect(reducer).toBeDefined();
    });

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('update message status error', () => {
        expect(reducer(undefined, {type: UPDATE_MESSAGE_STATUS_ERROR})).toEqual(1);
        expect(reducer(undefined, {type: UPDATE_MESSAGE_STATUS_ERROR})).toEqual(1);
    });

    it('some action', () => {
        expect(reducer(undefined, {type: UPDATE_MESSAGE_STATUS_SUCCESS})).toEqual(initialState);
    });
});
