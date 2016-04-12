import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

function createStoreWithMiddleware(initialState) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware)
    );
}

export default createStoreWithMiddleware;
