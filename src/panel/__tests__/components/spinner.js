jest.dontMock('../../components/spinner');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Spinner = require('../../components/spinner');

describe('Spinner', () => {
    it('defined', () => {
        expect(Spinner).toBeDefined();
    });

    it('render', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<Spinner/>);

        const {type, props} = renderer.getRenderOutput();

        expect(type).toBe('div');
        expect(props.className).toBe('center');
        expect(props.children.props.className).toBe('spinner');
    });
});
