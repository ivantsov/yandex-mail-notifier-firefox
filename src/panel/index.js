const React = require('react');
const {render, unmountComponentAtNode} = require('react-dom');
const {Provider} = require('react-redux');
const App = require('./components/app');
const store = require('./store');

const mountNode = document.getElementById('app');

self.port.on('show', () => {
    render(
        <Provider store={store}>
            <App date={Date.now()}/>
        </Provider>, mountNode
    );
});

self.port.on('hide', () => unmountComponentAtNode(mountNode));
