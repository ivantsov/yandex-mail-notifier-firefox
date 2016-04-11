jest.unmock('../hover-menu');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import l10n from '../../utils/l10n';
import HoverMenu from '../hover-menu';

const actionNames = ['mark_read', 'delete', 'tospam'];
const baseProps = {
    id: '123',
    onUpdateMessageStatus: jest.fn()
};
const l10nDictionary = {
    markRead: 'mark as read',
    remove: 'remove',
    spam: 'spam'
};
const l10nKeys = Object.keys(l10nDictionary);

l10n.text = jest.fn(key => l10nDictionary[key]);

function getRenderOutput(props) {
    const renderer = TestUtils.createRenderer();

    renderer.render(<HoverMenu {...props}/>);

    return renderer.getRenderOutput();
}

describe('HoverMenu', () => {
    it('defined', () => {
        expect(HoverMenu).toBeDefined();
    });

    it('render', () => {
        const {
            type: componentType,
            props: {children}
        } = getRenderOutput(baseProps);

        expect(componentType).toBe('div');

        children.forEach(({type, key, props}, index) => {
            const [icon, text] = props.children;

            expect(type).toBe('div');
            expect(key).toBe(index.toString());
            expect(props.onClick).toEqual(jasmine.any(Function));
            expect(icon.props.children.props.xlinkHref).toBe(`#${l10nKeys[key]}`);
            expect(text.props.children).toBe(l10nDictionary[l10nKeys[key]]);
        });
    });

    it('onClick', () => {
        const component = TestUtils.renderIntoDocument(
            <div>
                <HoverMenu {...baseProps}/>
            </div>
        );
        const buttons = component.querySelectorAll('.hover-menu__item');

        [...buttons].forEach((item, index) => {
            TestUtils.Simulate.click(item);

            expect(baseProps.onUpdateMessageStatus).lastCalledWith({
                id: baseProps.id,
                oper: actionNames[index]
            });
        });
    });
});
