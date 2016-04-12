jest.unmock('../notification');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {ERROR_NOTIFICATION_TIMEOUT} from '../../../config';
import l10n from '../../utils/l10n';
import Notification from '../notification';

const l10nReturnValue = 'test';

l10n.text = jest.fn(() => l10nReturnValue);

describe('Notification', () => {
    it('defined', () => {
        expect(Notification).toBeDefined();
    });

    it('first render', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Notification id={0}/>);

        const {type, props} = renderer.getRenderOutput();

        expect(clearTimeout).not.toBeCalled();
        expect(setTimeout).not.toBeCalled();
        expect(type).toBe('div');
        expect(props.className).toBe('notification ');
        expect(props.children).toBe(l10nReturnValue);
    });

    it('second render with the same props', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Notification id={0}/>);
        renderer.render(<Notification id={0}/>);

        const {type, props} = renderer.getRenderOutput();

        expect(clearTimeout).not.toBeCalled();
        expect(setTimeout).not.toBeCalled();
        expect(type).toBe('div');
        expect(props.className).toBe('notification ');
        expect(props.children).toBe(l10nReturnValue);
    });

    it('second render with different props', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Notification id={0}/>);
        renderer.render(<Notification id={1}/>);

        const {type, props} = renderer.getRenderOutput();

        expect(clearTimeout).toBeCalled();
        expect(setTimeout).lastCalledWith(jasmine.any(Function), ERROR_NOTIFICATION_TIMEOUT);
        expect(type).toBe('div');
        expect(props.className).toBe('notification notification_open');
        expect(props.children).toBe(l10nReturnValue);

        jest.runAllTimers();

        expect(renderer.getRenderOutput().props.className).toBe('notification ');
    });
});
