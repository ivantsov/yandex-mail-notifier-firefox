jest.unmock('../header');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import openTab from '../../utils/tab';
import l10n from '../../utils/l10n';
import Header from '../header';

const baseProps = {
    user: 'test@ya.ru',
    unreadCount: 10,
    loading: false,
    onReload: jest.fn()
};
const l10nReturnValue = 'test';

l10n.text.mockReturnValue(l10nReturnValue);

function getRenderOutput(props) {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Header {...props}/>);

    return renderer.getRenderOutput();
}

describe('Header', () => {
    it('defined', () => {
        expect(Header).toBeDefined();
    });

    describe('render', () => {
        it('not loading', () => {
            const {type, props: {children}} = getRenderOutput(baseProps);
            const [logo, center, compose] = children;
            const [user, button] = center.props.children;

            expect(type).toBe('div');
            expect(logo.props.onClick).toEqual(jasmine.any(Function));

            expect(user.props.onClick).toEqual(jasmine.any(Function));
            expect(user.props.children[0]).toBe(baseProps.user);
            expect(user.props.children[2].props.children).toBe(baseProps.unreadCount);
            expect(button.props.disabled).toBeFalsy();
            expect(button.props.onClick).toBe(baseProps.onReload);

            expect(compose.props.onClick).toEqual(jasmine.any(Function));
            expect(compose.props.children[1]).toBe(l10nReturnValue);
        });

        it('loading', () => {
            const {props: {children}} = getRenderOutput({
                ...baseProps,
                loading: true
            });

            expect(children[1].props.children[1].props.disabled).toBeTruthy();
        });
    });

    describe('onClick', () => {
        it('openTab', () => {
            const component = TestUtils.renderIntoDocument(
                <div>
                    <Header {...baseProps}/>
                </div>
            );
            const nodes = component.querySelectorAll('a');

            expect(openTab.mock.calls.length).toBe(0);

            TestUtils.Simulate.click(nodes[0]);

            expect(openTab.mock.calls.length).toBe(1);

            TestUtils.Simulate.click(nodes[1]);

            expect(openTab.mock.calls.length).toBe(2);

            TestUtils.Simulate.click(nodes[2]);

            expect(openTab).lastCalledWith('#compose');
        });

        it('reload', () => {
            const component = TestUtils.renderIntoDocument(
                <div>
                    <Header {...baseProps}/>
                </div>
            );
            const node = component.querySelector('.header__reload');

            TestUtils.Simulate.click(node);

            expect(baseProps.onReload).toBeCalled();
        });
    });
});
