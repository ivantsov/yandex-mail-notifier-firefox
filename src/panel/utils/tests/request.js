jest.unmock('../request');

import {API_URL} from '../../../config';
import request from '../request';

const {
    get,
    post
} = request;

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
const open = jest.fn();
const setRequestHeader = jest.fn();
let send, onload, onerror;

window.console = {
    error: jest.fn()
};

function createXHRmock(params) {
    // don't use arrow function because we need `this` from context
    send = jest.fn(function () {
        Object.assign(this, params);

        onload = this.onload.bind(this);
        onerror = this.onerror.bind(this);
    });

    window.XMLHttpRequest = jest.fn(() => ({
        open,
        send,
        setRequestHeader
    }));
}

describe('utils/request', () => {
    beforeEach(window.console.error.mockClear);

    it('defined', () => {
        expect(get).toBeDefined();
        expect(post).toBeDefined();
    });

    describe('get', () => {
        const expectedType = 'GET';

        function checkCase(mockData) {
            createXHRmock(mockData);

            const promise = get(expected.url);

            expect(open).lastCalledWith(expectedType, expected.fullUrl, true);
            expect(setRequestHeader).not.toBeCalled();
            expect(send).lastCalledWith('');

            return promise;
        }

        pit('success', () => {
            const promise = checkCase({
                status: 200,
                responseXML: expected.response
            });

            onload();

            return promise
                .then(res => expect(res).toEqual(expected.response))
                .catch(fail);
        });

        describe('error', () => {
            pit('by code', () => {
                const promise = checkCase({status: 500});

                onload();

                return promise
                    .then(fail)
                    .catch(() => expect(window.console.error).toBeCalled());
            });

            pit('by network', () => {
                const promise = checkCase();

                onerror();

                return promise
                    .then(fail)
                    .catch(() => expect(window.console.error).toBeCalled());
            });
        });
    });

    describe('post', () => {
        const expectedType = 'POST';

        function checkCase(mockData) {
            createXHRmock(mockData);

            const promise = post({
                url: expected.url,
                params: expected.params
            });

            expect(open).lastCalledWith(expectedType, expected.fullUrl, true);
            expect(setRequestHeader).toBeCalled();
            expect(send).lastCalledWith('param=123&arr=1&arr=2');

            return promise;
        }

        pit('success', () => {
            const promise = checkCase({
                status: 200,
                responseXML: expected.response
            });

            onload();

            return promise
                .then(res => expect(res).toEqual(expected.response))
                .catch(fail);
        });

        describe('error', () => {
            pit('by code', () => {
                const promise = checkCase({status: 500});

                onload();

                return promise
                    .then(fail)
                    .catch(() => expect(window.console.error).toBeCalled());
            });

            pit('by network', () => {
                const promise = checkCase();

                onerror();

                return promise
                    .then(fail)
                    .catch(() => expect(window.console.error).toBeCalled());
            });
        });
    });
});
