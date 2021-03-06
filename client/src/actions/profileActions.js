import * as actions from '../actions/types.js';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';

//util
//import setAuthToken from '../util/setAuthToken.js';

//import jwt_decode from 'jwt-decode';


//Get current profile
export const getCurrentProfile = () => dispatch => {
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

//Delete account & profile
export const deleteAccount = () => dispatch => {
	if(window.confirm('Delete Accout? (WARNING: This action cannot be undone)')){//delete confirmations here instead of at call?
		axios.delete('/api/profile')
			.then(
				dispatch({
					type:actions.SET_CURRENT_USER, 
					payload:{}
				})
			)
			.catch(err => //this basically logs user out due to how it's setup
				dispatch({
					type:actions.GET_PROFILE,
					payload: {}
				})
		);
	}
}



//Add experience
export const addExperience = (expData, history) => dispatch => {
	axios.post('api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err => {
			dispatch({
				type: actions.GET_ERRORS,
				payload:err.response.data
			})
		}); 
}

//Add education
export const addEducation = (eduData, history) => dispatch => {
	axios.post('api/profile/education', eduData)
	.then(res => history.push('/dashboard'))
	.catch(err => {
		dispatch({
			type: actions.GET_ERRORS,
			payload:err.response.data
		})
	}); 
}


//Delete experience
export const deleteExperience = (id) => dispatch => {
//	console.log('ping');
	if(window.confirm('Delete record? (WARNING: This action cannot be undone)')){//delete confirmations here instead of at call?
		axios.delete(`/api/profile/experience/{$id}`)
		.then(res => {
			dispatch({
				type:actions.GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => //this basically logs user out due to how it's setup
		dispatch({
			type: actions.GET_ERRORS,
			payload:err.response.data
		})
		);
	}
}

//Delete education
export const deleteEducation = (id) => dispatch => {
//	console.log('ping');
	if(window.confirm('Delete record? (WARNING: This action cannot be undone)')){//delete confirmations here instead of at call?
		axios.delete(`/api/profile/education/{$id}`)
		.then(res => {
			dispatch({
				type:actions.GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => //this basically logs user out due to how it's setup
		dispatch({
			type: actions.GET_ERRORS,
			payload:err.response.data
		})
		);
	}
}


//Get all profiles 
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
//	console.log('ping');
	axios.get('/api/profile/all')
	.then(res => {
		dispatch({
			type:actions.GET_PROFILES,
			payload: res.data
		});
	})
	.catch(err => //keep the state null
	dispatch({
		type: actions.GET_PROFILES,
		payload:null
	})
	);

}

 
export const getProfileByHandle = (handle) => dispatch => {
	dispatch(setProfileLoading());
//	console.log('ping');
		
	axios.get(`/api/profile/handle/${handle}`)
		.then(res => {
			dispatch({
				type:actions.GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => 
			dispatch({
				type:actions.GET_PROFILE,
				payload: null
			})
		);
}






