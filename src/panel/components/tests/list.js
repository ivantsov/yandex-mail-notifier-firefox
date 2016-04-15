jest.unmock('../spinner');
jest.unmock('../item');
jest.unmock('../list');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import l10n from '../../utils/l10n';
import Spinner from '../spinner';
import Item from '../item';
import List from '../list';

const baseProps = {
    items: [],
    loading: true,
    error: false,
    onUpdateMessageStatus: jest.fn()
};
const l10nDictionary = {
    loadingError: 'loading error',
    emptyList: 'no items'
};

l10n.text = jest.fn(key => l10nDictionary[key]);

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
        expect(props.children).toBe(l10nDictionary.loadingError);
    });

    it('no items', () => {
        const {type, props} = getRenderOutput({
            ...baseProps,
            loading: false
        });

        expect(type).toBe('div');
        expect(props.children).toBe(l10nDictionary.emptyList);
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
        const {type: componentType, props: {children}} = getRenderOutput({
            ...baseProps,
            loading: false,
            items
        });

        expect(componentType).toBe('div');
        expect(children.length).toBe(2);

        children.forEach(({type, key, props}, index) => {
            expect(type).toBe(Item);
            expect(key).toBe(items[index].id);
            expect(props.id).toBe(items[index].id);
            expect(props.from).toBe(items[index].from);
            expect(props.subject).toBe(items[index].subject);
            expect(props.date).toBe(items[index].date);
        });
    });
});
