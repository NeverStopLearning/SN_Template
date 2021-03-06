const Validator = require('validator');

const isEmpty = require('../util/is-empty.js');

//see if there is a better way to do this validation class part
module.exports = function validateRegisterInput(data){
	let errors = {};
	
	//trim and initialize empty string for Validatory.isEmpty(string)
	data.name = !isEmpty(data.name ? data.name.trim() : data.name) ? data.name.trim() : '' ;
	data.email = !isEmpty(data.email ? data.email.trim() : data.email) ? data.email.trim() : '' ;
	data.password = !isEmpty(data.password ? data.password.trim() : data.password) ? data.password.trim() : '' ;
	data.password2 = !isEmpty(data.password2 ? data.password2.trim() : data.password2) ? data.password2.trim() : '' ;
	
	//validate name
	if(!Validator.isLength(data.name, { min:2, max: 30})){
		errors.name = "Name must be between 2 and 30 characters";
	}
	
	if(Validator.isEmpty(data.name)){
		errors.name = 'Name field is required';
	}
	
	//validate email - order matters here so maybe use an "else if". Check other validations
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}
	
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field is required';
	}
		
	
	//validate password
	if(Validator.isEmpty(data.password)){
		errors.password = "Password field is required";
	}
	
	if(!Validator.isLength(data.password, { min: 5, max: 30})){
		errors.password = "Password must be a least 5 characters";
	}
	
	if(Validator.isEmpty(data.password2)){
		errors.password2 = "Confirm password field is required";
	}
	
	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = "Passwords must match";
	}
	
	
	//console.log('isEmpty(errors)', isEmpty(errors));
	return {
		errors : errors, // or just | errors, |
		isValid: isEmpty(errors)
	}
	
}