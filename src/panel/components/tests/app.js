jest.unmock('../app');
jest.unmock('../notification');
jest.unmock('../header');
jest.unmock('../list');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../app';
import Notification from '../notification';
import Header from '../header';
import List from '../list';

const baseProps = {
    user: 'test@ya.ru',
    messages: {
        unreadCount: 5,
        items: [{id: '123'}, {id: '456'}],
        loading: true,
        error: false
    },
    notification: 0,
    loadMessages: jest.fn(),
    updateMessageStatus: jest.fn()
};

function getRenderOutput() {
    const renderer = TestUtils.createRenderer();

    renderer.render(<App.Component {...baseProps}/>);

    return renderer.getRenderOutput();
}

describe('App', () => {
    beforeEach(baseProps.loadMessages.mockClear);

    it('defined', () => {
        expect(App.Component).toBeDefined();
        expect(App.ConnectedComponent).toBeDefined();
    });

    it('componentWillMount', () => {
        getRenderOutput();

        expect(baseProps.loadMessages).toBeCalled();
    });

    it('render', () => {
        const {
            type,
            props: {children}
        } = getRenderOutput();
        const [
            notification,
            header,
            list
        ] = children;

        expect(type).toBe('div');

        expect(notification.type).toBe(Notification);
        expect(notification.props.id).toBe(baseProps.notification);

        expect(header.type).toBe(Header);
        expect(header.props.user).toBe(baseProps.user);
        expect(header.props.unreadCount).toBe(baseProps.messages.unreadCount);
        expect(header.props.loading).toBe(baseProps.messages.loading);
        expect(header.props.onReload).toEqual(baseProps.loadMessages);

        expect(list.type).toBe(List);
        expect(list.props.items).toBe(baseProps.messages.items);
        expect(list.props.loading).toBe(baseProps.messages.loading);
        expect(list.props.error).toBe(baseProps.messages.error);
        expect(list.props.onUpdateMessageStatus).toEqual(baseProps.updateMessageStatus);
    });

    it('callbacks', () => {
        const [
            notification, // eslint-disable-line no-unused-vars
            header,
            list
        ] = getRenderOutput().props.children;

        header.props.onReload();
        expect(baseProps.loadMessages).toBeCalled();

        list.props.onUpdateMessageStatus();
        expect(baseProps.updateMessageStatus).toBeCalled();
    });
});
