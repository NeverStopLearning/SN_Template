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
		case actions.GET_POSTS:
			return{ //TODO: need to understand this part better
			...state,
			posts: action.payload,
			loading: false
		}
		case actions.POST_LOADING:
			return{ //TODO: need to understand this part better
			...state,
			loading: true
		}
		default:
			return state;
		
	}
}