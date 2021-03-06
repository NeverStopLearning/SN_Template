//import { TEST_DISPATCH } from '../actions/types.js';
import * as actions from '../actions/types.js';

import isEmpty from '../validations/is-empty.js';



const initialState = {
		isAuthenticated: false,
		user:{}
}

export default function(state = initialState, action){
	//this area is hit every request no matter who makes it
//	console.log("auth: ", action);
	switch(action.type){
		/*
		 //test connections
		case actions.TEST_DISPATCH:
			return {
				...state,
				user: action.payload
			}*/
	
		case actions.SET_CURRENT_USER:
//			console.log("SET_CURRENT_USER");
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user:action.payload
			}			
		
		default:
			return state;
	}
}

