const React = require('react');
const {render} = require('react-dom');
const {Provider} = require('react-redux');
const App = require('./components/app');
const configureStore = require('./store');

const store = configureStore();

self.port.on('show', () => {
    render(
        <Provider store={store}>
            <App date={Date.now()}/>
        </Provider>,
        document.getElementById('app')
    );
});
