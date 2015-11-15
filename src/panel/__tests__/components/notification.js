jest.dontMock('../../utils/l10n');
jest.dontMock('../../components/notification');

self.options = {
    l10n: {
        operationError: 'error text'
    }
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const {ERROR_NOTIFICATION_TIMEOUT} = require('../../../config');
const Notification = require('../../components/notification');

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
        expect(props.children).toBe(self.options.l10n.operationError);
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
        expect(props.children).toBe(self.options.l10n.operationError);
    });

    it('second render with different props', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Notification id={0}/>);
        renderer.render(<Notification id={1}/>);

        const {type, props} = renderer.getRenderOutput();

        expect(clearTimeout).toBeCalled();
        expect(setTimeout).toBeCalledWith(jasmine.any(Function), ERROR_NOTIFICATION_TIMEOUT);
        expect(type).toBe('div');
        expect(props.className).toBe('notification notification_open');
        expect(props.children).toBe(self.options.l10n.operationError);
    });
});
