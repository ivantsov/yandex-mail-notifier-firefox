jest.dontMock('../../utils/l10n');
jest.dontMock('../../components/hover-menu');
jest.dontMock('../../components/item');

self.options = {
    l10n: {}
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const l10n = require('../../utils/l10n');
const {openTab} = require('../../utils/tab');
const HoverMenu = require('../../components/hover-menu');
const Item = require('../../components/item');

const baseProps = {
    id: '123',
    from: 'sender',
    subject: 'subject',
    firstline: 'content',
    date: new Date(),
    onUpdateMessageStatus: jest.genMockFn()
};

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
        const {type, props: {children, onClick}} = getRenderOutput(baseProps);
        const [header, subject, content, hoverMenu] = children;
        const [from, date] = header.props.children;

        expect(type).toBe('a');
        expect(onClick).toEqual(jasmine.any(Function));
        expect(from.props.children).toBe(baseProps.from);
        expect(date.props.children).toBe(l10n.date(baseProps.date));
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

        expect(openTab).toBeCalledWith(`#message/${baseProps.id}`);
    });
});
