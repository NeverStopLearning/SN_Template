import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //used for ajax call backs or something like that

import rootReducer from '../reducers'; //don't need 'index.js' due to naming. It auto looks for 'index.js' (think it's a html thing. Look into it. just saw something on the udemy html css course about it)



const initialState = {};
const middleware = [thunk];


//const store = createStore(root reduce, initState, enhancer); 
//const store = createStore(()=>[], {}, applyMiddleware(...middleware)); //... aka spread operator 
//const store = createStore(rootReducer, initialState, applyMiddleware(...middleware)); 
const store = createStore(
		rootReducer, 
		initialState, 
		compose(
				applyMiddleware(...middleware),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //BREAKS FOR IE. ONLY WORKS ON CROME CAUSE ITS FOR DEVTOOLS?
			)		
		); //compose is being used for Redux chrome extention. Not sure what else it can be used for.

export default store;