jest.unmock('..//hover-menu');
jest.unmock('../item');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import l10n from '../../utils/l10n';
import openTab from '../../utils/tab';
import HoverMenu from '../hover-menu';
import Item from '../item';

const baseProps = {
    id: '123',
    from: 'sender',
    subject: 'subject',
    firstline: 'content',
    date: new Date(),
    onUpdateMessageStatus: jest.genMockFn()
};
const l10nReturnValue = 'test';

l10n.date = jest.fn(() => l10nReturnValue);

function getRenderOutput(props) {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Item {...props}/>);

    return renderer.getRenderOutput();
}

describe('Item', () => {
    it('defined', () => {
        expect(Item).toBeDefined();
    });

    it('render', () => {
        const {
            type,
            props: {
                children,
                onClick
            }
        } = getRenderOutput(baseProps);
        const [
            header,
            subject,
            content,
            hoverMenu
        ] = children;
        const [
            from,
            date
        ] = header.props.children;

        expect(type).toBe('a');
        expect(onClick).toEqual(jasmine.any(Function));
        expect(from.props.children).toBe(baseProps.from);
        expect(date.props.children).toBe(l10nReturnValue);
        expect(subject.props.children).toBe(baseProps.subject);
        expect(content.props.children).toBe(baseProps.firstline);
        expect(hoverMenu.type).toBe(HoverMenu);
        expect(hoverMenu.props.id).toBe(baseProps.id);
        expect(hoverMenu.props.onUpdateMessageStatus).toBe(baseProps.onUpdateMessageStatus);
    });

    it('onClick', () => {
        const component = TestUtils.renderIntoDocument(
            <div>
                <Item {...baseProps}/>
            </div>
        );
        const componentNode = component.querySelector('.email');

        TestUtils.Simulate.click(componentNode);

        expect(openTab).lastCalledWith(`#message/${baseProps.id}`);
    });
});
