import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

function createStoreWithMiddleware(initialState) {
    return applyMiddleware(thunkMiddleware)(createStore)(reducers, initialState);
}

export default createStoreWithMiddleware;
