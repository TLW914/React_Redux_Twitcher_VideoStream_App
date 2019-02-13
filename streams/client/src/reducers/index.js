import { combineReducers } from 'redux';
//imported named reducer from redux-form and renamed it
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer.js';
import streamReducer from './streamReducer.js';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});