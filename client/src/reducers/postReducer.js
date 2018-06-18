import * as actions from '../actions/types.js';


const initialState = {
		posts:[],
		post:{},
		loading: false
};

export default function(state = initialState, action){
	
	switch(action.type){
	
		case actions.ADD_POST:
			return{ //TODO: need to understand this part better
				...state,
				posts:[action.payload, ...state.posts]
			}
		default:
			return state;
		
	}
}