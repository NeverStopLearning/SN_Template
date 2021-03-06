//import { TEST_DISPATCH } from './types';
import * as actions from '../actions/types.js';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';

//util
import setAuthToken from '../util/setAuthToken.js';

import jwt_decode from 'jwt-decode';



// Register User
export const registerUser = (userData, history) => dispatch => {
	//Currently used in Dev only
	//axios - uses proxy in server file to skip the http ~ 5000
	axios.post('/api/users/register', userData)
		.then(res => {
//			console.log("res authAction: ", res);
			history.push('/login');
		})
		.catch(err => 
//			this.setState({ errors: err.response.data })
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
	
};



// Login - Get User Token
export const loginUser = (userData) => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			//TODO remove test
//			console.log("loginUser - res(whats .data value? ): ", res );
			
			//Save to localStorage TODO better understand 'localStorage'
			const {token} = res.data;
			
			//Set token to localStorage
			localStorage.setItem('jwtToken', token);
			
			//Set token to Auth header
			setAuthToken(token);
			
			//Decode token to get user data
			const decoded = jwt_decode(token);
//			console.log("decoded: ", decoded );
			
			//Set current user
			dispatch(setCurrentUser(decoded)); 
			
			
		})
		.catch(err => 
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};


//Set logged in user
export const setCurrentUser = (decoded) => {
	return 	{
		type:actions.SET_CURRENT_USER,
		payload: decoded
	}
};


//Log user out
export const logoutUser = () => dispatch => {
	
	//Remove token from localStorage
	localStorage.removeItem('jwtToken');
	
	//Remove auth header for future requests
	setAuthToken(false);
	
	//Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};









/* //good but needed to add history so we can redirect page from here. 
 export const registerUser = (userData) => dispatch => {
	//Currently used in Dev only
	//axios - uses proxy in server file to skip the http ~ 5000
	axios.post('/api/users/register', userData)
		.then(res => {
			console.log("res", res);
		})
		.catch(err => 
//			this.setState({ errors: err.response.data })
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
	
};*/



//This is how the action should be. The above should have it's own called dispatch or something. Look into it. I don't think the calls shoud happen here.
//Register User
/*export const registerUser = (userData) => {
	return {
		type: actions.TEST_DISPATCH,
		payload: userData
	};
}*/

