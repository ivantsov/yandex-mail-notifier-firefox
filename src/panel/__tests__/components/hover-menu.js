jest.dontMock('../../utils/l10n');
jest.dontMock('../../components/hover-menu');

self.options = {
    l10n: {
        markRead: 'mark as read',
        remove: 'remove',
        spam: 'spam'
    }
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const HoverMenu = require('../../components/hover-menu');

const keyNames = Object.keys(self.options.l10n);
const actionNames = ['mark_read', 'delete', 'tospam'];
const baseProps = {
    id: '123',
    onUpdateMessageStatus: jest.genMockFn()
};

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
        const {type, props: componentProps} = getRenderOutput(baseProps);

        expect(type).toBe('div');

        componentProps.children.forEach(({type, key, props}, index) => {
            const [icon, text] = props.children;

            expect(type).toBe('div');
            expect(key).toBe(index.toString());
            expect(props.onClick).toEqual(jasmine.any(Function));
            expect(icon.props.children.props.xlinkHref).toBe(`#${keyNames[index]}`);
            expect(text.props.children).toBe(self.options.l10n[keyNames[index]]);
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

            expect(baseProps.onUpdateMessageStatus).toBeCalledWith({
                id: baseProps.id,
                oper: actionNames[index]
            });
        });
    });
});
