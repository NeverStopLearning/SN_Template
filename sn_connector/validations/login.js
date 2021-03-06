const Validator = require('validator');

const isEmpty = require('../util/is-empty.js');

//see if there is a better way to do this validation class part
module.exports = function validateLoginInput(data){
	let errors = {};
	
	//trim and initialize empty string for Validatory.isEmpty(string)
	data.email = !isEmpty(data.email ? data.email.trim(): data.email) ? data.email.trim() : '' ;
	data.password = !isEmpty(data.password ? data.password.trim(): data.password) ? data.password.trim() : '' ;
	
	
	
	//validate email - order matters here so maybe use an "else if"
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}
	
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field is required';
	}
	
	
	//validate password	
	if(!Validator.isLength(data.password, { min: 5, max: 30})){
		errors.password = "Password must be a least 5 characters";
	}
	
	if(Validator.isEmpty(data.password)){
		errors.password = "Password field is required";
	}
	
	

	
	return {
		errors : errors, // or just | errors, |
		isValid: isEmpty(errors)
	}
	
}