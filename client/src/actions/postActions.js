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
};



//Get Posts
export const getPosts = () => dispatch => {
	dispatch(setPostsLoading());
	axios.get('/api/posts')
		.then(res => 
			dispatch({
				type: actions.GET_POSTS,
				payload: res.data
			})		
		)
		.catch(err =>
			dispatch({
				type:actions.GET_POSTS,
				payload: null
			})
		);
};



//Get Post
export const getPost = (id) => dispatch => {
	dispatch(setPostsLoading());
	axios.get(`/api/posts/${id}`)
	.then(res => 
	dispatch({
		type: actions.GET_POST,
		payload: res.data
	})		
	)
	.catch(err =>
	dispatch({
		type:actions.GET_POST,
		payload: null
	})
	);
};



//Delete Post
export const deletePost = (id) => dispatch => {
//	console.log(id);
	axios.delete('/api/posts/'+id)
		.then(res => 
			dispatch({
				type: actions.DELETE_POST,
				payload: id
			})		
		)
		.catch(err =>
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};


//Add Like
export const addLike = (id) => dispatch => {
//	console.log(id);
	axios.post('/api/posts/like/'+id)
	.then(res => 
		dispatch(getPosts())		
	)
	.catch(err =>
	dispatch({
		type:actions.GET_ERRORS,
		payload: err.response.data
	})
	);
};


//Remove Like
export const removeLike = (id) => dispatch => {
//	console.log(id);
	axios.post('/api/posts/unlike/'+id)
	.then(res => 
	dispatch(getPosts())		
	)
	.catch(err =>
	dispatch({
		type:actions.GET_ERRORS,
		payload: err.response.data
	})
	);
};



//Add Comment
export const addComment = (postId, commentData) => dispatch => {
	axios.post(`/api/posts/comment/${postId}`, commentData)
		.then(res => 
			dispatch({
				type: actions.GET_POST,
				payload: res.data
			})		
		)
		.catch(err =>
			dispatch({
				type:actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};



//Set loading state
export const setPostsLoading = () => {
	return {
		type: actions.POST_LOADING
	}
}









