import { combineReducers } from 'redux';

//reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';




const reducers = {
		auth: authReducer,
		errors: errorReducer,
		profile: profileReducer
};


export default combineReducers(reducers);



