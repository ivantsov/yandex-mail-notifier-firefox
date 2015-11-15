jest.dontMock('../../utils/l10n');
jest.dontMock('../../components/spinner');
jest.dontMock('../../components/item');
jest.dontMock('../../components/list');

self.options = {
    l10n: {
        loadingError: 'loading error',
        emptyList: 'no items'
    }
};

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Spinner = require('../../components/spinner');
const Item = require('../../components/item');
const List = require('../../components/list');

const baseProps = {
    items: [],
    loading: true,
    error: false,
    onUpdateMessageStatus: jest.genMockFn()
};

function getRenderOutput(props) {
    const renderer = TestUtils.createRenderer();

    renderer.render(<List {...props}/>);

    return renderer.getRenderOutput();
}

describe('List', () => {
    it('defined', () => {
        expect(List).toBeDefined();
    });

    it('loading', () => {
        const {type} = getRenderOutput(baseProps);

        expect(type).toBe(Spinner);
    });

    it('error', () => {
        const {type, props} = getRenderOutput({
            ...baseProps,
            loading: false,
            error: true
        });

        expect(type).toBe('div');
        expect(props.children).toBe(self.options.l10n.loadingError);
    });

    it('no items', () => {
        const {type, props} = getRenderOutput({
            ...baseProps,
            loading: false
        });

        expect(type).toBe('div');
        expect(props.children).toBe(self.options.l10n.emptyList);
    });

    it('with items', () => {
        const items = [{
            id: '123',
            from: 'sender123',
            subject: 'subject123',
            firstline: 'content123',
            date: new Date()
        }, {
            id: '456',
            from: 'sender456',
            subject: 'subject456',
            firstline: 'content456',
            date: new Date()
        }];
        const {type, props} = getRenderOutput({
            ...baseProps,
            loading: false,
            items
        });

        expect(type).toBe('div');
        expect(props.children.length).toBe(2);

        props.children.forEach(({type, key, props}, index) => {
            expect(type).toBe(Item);
            expect(key).toBe(items[index].id);
            expect(props.id).toBe(items[index].id);
            expect(props.from).toBe(items[index].from);
            expect(props.subject).toBe(items[index].subject);
            expect(props.date).toBe(items[index].date);
        });
    });
});
