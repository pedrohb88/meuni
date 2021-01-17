import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import college from './college';

export default combineReducers({
    alert,
    auth,
    profile,
    college
});