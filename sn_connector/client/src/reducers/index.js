import { combineReducers } from 'redux';

//reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';




const reducers = {
		auth: authReducer,
		errors: errorReducer,
		profile: profileReducer,
		post: postReducer
};


export default combineReducers(reducers);



