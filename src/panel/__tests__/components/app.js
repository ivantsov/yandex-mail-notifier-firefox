jest.dontMock('../../components/app');
jest.dontMock('../../components/notification');
jest.dontMock('../../components/header');
jest.dontMock('../../components/list');

self.options = {
    l10n: {}
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const {loadMessages, updateMessageStatus} = require('../../actions');
const {Component: App} = require('../../components/app');
const Notification = require('../../components/notification');
const Header = require('../../components/header');
const List = require('../../components/list');

const baseProps = {
    user: 'test@ya.ru',
    messages: {
        unreadCount: 5,
        items: [{id: '123'}, {id: '456'}],
        loading: true,
        error: false
    },
    notification: 0,
    dispatch: jest.genMockFn()
};

describe('App', () => {
    it('defined', () => {
        expect(App).toBeDefined();
    });

    it('render', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<App {...baseProps}/>);

        const {type, props: {children}} = renderer.getRenderOutput();
        const [notification, header, list] = children;

        expect(type).toBe('div');

        // componentWillMount
        expect(baseProps.dispatch.mock.calls.length).toBe(1);
        expect(loadMessages.mock.calls.length).toBe(1);

        expect(notification.type).toBe(Notification);
        expect(notification.props.id).toBe(baseProps.notification);

        expect(header.type).toBe(Header);
        expect(header.props.user).toBe(baseProps.user);
        expect(header.props.unreadCount).toBe(baseProps.messages.unreadCount);
        expect(header.props.loading).toBe(baseProps.messages.loading);
        expect(header.props.onReload).toEqual(jasmine.any(Function));

        header.props.onReload();
        expect(baseProps.dispatch.mock.calls.length).toBe(2);
        expect(loadMessages.mock.calls.length).toBe(2);

        expect(list.type).toBe(List);
        expect(list.props.items).toBe(baseProps.messages.items);
        expect(list.props.loading).toBe(baseProps.messages.loading);
        expect(list.props.error).toBe(baseProps.messages.error);
        expect(list.props.onUpdateMessageStatus).toEqual(jasmine.any(Function));

        list.props.onUpdateMessageStatus();
        expect(baseProps.dispatch.mock.calls.length).toBe(3);
        expect(updateMessageStatus.mock.calls.length).toBe(1);
    });
});
