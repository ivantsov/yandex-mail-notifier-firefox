const React = require('react');
const {render, unmountComponentAtNode} = require('react-dom');
const {Provider} = require('react-redux');
const App = require('./components/app');
const configureStore = require('./store');

const mountNode = document.getElementById('app');

self.port.on('show', user => {
    const store = configureStore({
        user,
        loading: true,
        unreadCount: 0,
        messages: []
    });

    render(
        <Provider store={store}>
            <App/>
        </Provider>, mountNode
    );
});

self.port.on('hide', () => unmountComponentAtNode(mountNode));
