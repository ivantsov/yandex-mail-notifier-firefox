jest.unmock('../user');

import {LOAD_MESSAGES} from '../../constants';
import reducer from '../user';

const initialState = '';

describe('user', () => {
    it('defined', () => {
        expect(reducer).toBeDefined();
    });

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('some action without state', () => {
        expect(reducer(undefined, {type: LOAD_MESSAGES})).toEqual(initialState);
    });

    it('some action with state', () => {
        const state = 'username';

        expect(reducer(state, {type: LOAD_MESSAGES})).toEqual(state);
    });
});
