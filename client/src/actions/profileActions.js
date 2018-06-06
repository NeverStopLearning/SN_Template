import * as actions from '../actions/types.js';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';

//util
//import setAuthToken from '../util/setAuthToken.js';

//import jwt_decode from 'jwt-decode';


//Get current profile
export const getCurrentProfile = ()=> dispatch => {
	dispatch(setProfileLoading());
	
	axios.get('/api/profile')
		.then(res => {
			dispatch({
				type:actions.GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => 
			dispatch({
				type:actions.GET_PROFILE,
				payload: {}
			})
		);
};


//Create Profile					
export const createProfile = (profileData, history) => dispatch => {
	
	axios.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err => 
			dispatch ({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};



//Profile loading
export const setProfileLoading = () => {
	return {
		type:actions.PROFILE_LOADING
	}
};


//Clear profile
export const clearCurrentProfile = () => {
	return { // is this auto dispatched? or dispatch(callThis())
		type:actions.CLEAR_CURRENT_PROFILE
	}
}