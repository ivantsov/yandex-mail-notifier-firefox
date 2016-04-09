import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import configureStore from './store';

const mountNode = document.getElementById('app');
const addListener = self.port.on;

addListener('show', initialState => {
    const store = configureStore(initialState);

    ReactDOM.render(
        <Provider store={store}>
            <App.ConnectedComponent/>
        </Provider>, mountNode
    );
});

addListener('hide', () => ReactDOM.unmountComponentAtNode(mountNode));
