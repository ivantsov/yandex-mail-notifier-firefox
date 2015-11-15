jest.dontMock('../../utils/l10n');
jest.dontMock('../../components/header');

self.options = {
    l10n: {
        compose: 'compose'
    }
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const {openTab} = require('../../utils/tab');
const Header = require('../../components/header');

const baseProps = {
    user: 'test@ya.ru',
    unreadCount: 10,
    loading: false,
    onReload: jest.genMockFn()
};

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
            expect(compose.props.children[2]).toBe(self.options.l10n.compose);
        });

        it('loading', () => {
            const {type, props: {children}} = getRenderOutput({
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

            expect(openTab).toBeCalledWith('#compose');
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
