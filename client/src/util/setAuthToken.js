import axios from 'axios';

const setAuthToken = (token) => {
	
	if(token){
		//Apply to every request
		axios.defaults.headers.common['Authorization'] = token;
	}
	else{
		//Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

//TODO better understand the 'default' and when to use it
export default setAuthToken;