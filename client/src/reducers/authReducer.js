//import { TEST_DISPATCH } from '../actions/types.js';
import * as actions from '../actions/types.js';



const initialState = {
		isAuthenticated: false,
		user:{}
}

export default function(state = initialState, action){
	console.log("action: ", action);
	switch(action.type){
		case actions.TEST_DISPATCH:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}

