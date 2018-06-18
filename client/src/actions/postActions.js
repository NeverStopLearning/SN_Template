import * as actions from '../actions/types.js';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';

//util
//import setAuthToken from '../util/setAuthToken.js';
//import jwt_decode from 'jwt-decode';



//Add Post
export const addPost = postData => dispatch => {
	axios.post('/api/posts', postData)
		.then(res => 
			dispatch({
				type: actions.ADD_POST,
				payload: res.data
			})		
		)
		.catch(err =>
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
}





