jest.dontMock('../../utils/tab');

self.port = {
    emit: jest.genMockFn()
};

const {openTab} = require('../../utils/tab');

describe('utils/tab', () => {
    it('defined', () => {
        expect(openTab).toBeDefined();
    });

    it('open', () => {
        const url = 'testUrl';

        openTab(url);

        expect(self.port.emit).toBeCalledWith('openTab', url);
    });
});
