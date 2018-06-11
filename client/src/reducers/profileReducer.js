import * as actions from '../actions/types.js';


const initialState = {
		profile:null,
		profiles:null,
		loading:false
};

export default function(state = initialState, action){
	//this area is hit every request no matter who makes it
//	console.log("errorsRe: ", action);
	switch(action.type){
		case actions.PROFILE_LOADING:
			return {
				...state,
				loading:true
			};
		
		case actions.GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading:false
			};
			
		case actions.GET_PROFILES:
			return {
			...state,
			profiles: action.payload,
			loading:false
		};
			
		case actions.CLEAR_CURRENT_PROFILE:
			return {
			...state,
			profile: null
		};
			
			
		default:
			return state;
	}
}

