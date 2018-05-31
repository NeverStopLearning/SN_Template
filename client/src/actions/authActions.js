//import { TEST_DISPATCH } from './types';
import * as actions from '../actions/types.js';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';


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

