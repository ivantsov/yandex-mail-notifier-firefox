import {combineReducers} from 'redux';
import user from './user';
import messages from './messages';
import notification from './notification';

export default combineReducers({
    user,
    messages,
    notification
});
