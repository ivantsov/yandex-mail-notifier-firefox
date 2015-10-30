const React = require('react');
const {render, unmountComponentAtNode} = require('react-dom');
const {Provider} = require('react-redux');
const App = require('./components/app');
const configureStore = require('./store');

const mountNode = document.getElementById('app');
const addListener = self.port.on;

addListener('show', user => {
    const store = configureStore({user});

    render(
        <Provider store={store}>
            <App/>
        </Provider>, mountNode
    );
});

addListener('hide', () => unmountComponentAtNode(mountNode));
