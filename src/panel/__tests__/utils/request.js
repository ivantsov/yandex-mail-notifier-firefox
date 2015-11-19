jest.dontMock('../../utils/request');

const {API_URL} = require('../../../config');
const {get, post} = require('../../utils/request');

const url = 'some url';
const expected = {
    url,
    fullUrl: `${API_URL}${url}`,
    params: {
        param: 123,
        arr: [1, 2]
    },
    response: 'some xml'
};

let open, send, setRequestHeader, onload, onerror;

function createXHRmock(params) {
    open = jest.genMockFn();

    setRequestHeader = jest.genMockFn();

    send = jest.genMockFn().mockImpl(function () {
        Object.assign(this, params);

        onload = this.onload.bind(this);
        onerror = this.onerror.bind(this);
    });

    const xhrMockClass = function () {
        return {
            open,
            send,
            setRequestHeader
        };
    };

    window.XMLHttpRequest = jest.genMockFn().mockImpl(xhrMockClass);
}

describe('utils/request', () => {
    it('defined', () => {
        expect(get).toBeDefined();
        expect(post).toBeDefined();
    });

    describe('get', () => {
        const expectedType = 'GET';

        pit('success', () => {
            createXHRmock({
                status: 200,
                responseXML: expected.response
            });

            const promise = get(expected.url);

            expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
            expect(setRequestHeader).not.toBeCalled();
            expect(send).toBeCalledWith('');

            onload();

            return promise
                .then(res => expect(res).toEqual(expected.response))
                .catch(fail);
        });

        describe('error', () => {
            pit('by code', () => {
                createXHRmock({status: 500});

                const promise = get(expected.url);

                expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
                expect(setRequestHeader).not.toBeCalled();
                expect(send).toBeCalledWith('');

                onload();

                return promise
                    .then(fail)
                    .catch(() => expect(true).toBeTruthy());
            });

            pit('by network', () => {
                createXHRmock();

                const promise = get(expected.url);

                expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
                expect(setRequestHeader).not.toBeCalled();
                expect(send).toBeCalledWith('');

                onerror();

                return promise
                    .then(fail)
                    .catch(() => expect(true).toBeTruthy());
            });
        });
    });

    describe('post', () => {
        const expectedType = 'POST';

        pit('success', () => {
            createXHRmock({
                status: 200,
                responseXML: expected.response
            });

            const promise = post({
                url: expected.url,
                params: expected.params
            });

            expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
            expect(setRequestHeader).toBeCalled();
            expect(send).toBeCalledWith('param=123&arr=1&arr=2');

            onload();

            return promise
                .then(res => expect(res).toEqual(expected.response))
                .catch(fail);
        });

        describe('error', () => {
            pit('by code', () => {
                createXHRmock({status: 500});

                const promise = post({
                    url: expected.url,
                    params: expected.params
                });

                expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
                expect(setRequestHeader).toBeCalled();
                expect(send).toBeCalledWith('param=123&arr=1&arr=2');

                onload();

                return promise
                    .then(fail)
                    .catch(() => expect(true).toBeTruthy());
            });

            pit('by network', () => {
                createXHRmock();

                const promise = post({
                    url: expected.url,
                    params: expected.params
                });

                expect(open).toBeCalledWith(expectedType, expected.fullUrl, true);
                expect(setRequestHeader).toBeCalled();
                expect(send).toBeCalledWith('param=123&arr=1&arr=2');

                onerror();

                return promise
                    .then(fail)
                    .catch(() => expect(true).toBeTruthy());
            });
        });
    });
});
