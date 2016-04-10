jest.unmock('../tab');

import openTab from '../tab';

self.port = {
    emit: jest.fn()
};

describe('tab', () => {
    it('defined', () => {
        expect(openTab).toBeDefined();
    });

    it('open', () => {
        const url = 'testUrl';

        openTab(url);

        expect(self.port.emit).lastCalledWith('openTab', url);
    });
});
