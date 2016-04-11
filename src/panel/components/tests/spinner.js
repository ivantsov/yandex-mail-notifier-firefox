jest.unmock('../spinner');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Spinner from '../spinner';

describe('Spinner', () => {
    it('defined', () => {
        expect(Spinner).toBeDefined();
    });

    it('render', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Spinner/>);

        const {type, props} = renderer.getRenderOutput();

        expect(type).toBe('div');
        expect(props.className).toBe('center');
        expect(props.children.props.className).toBe('spinner');
    });
});
