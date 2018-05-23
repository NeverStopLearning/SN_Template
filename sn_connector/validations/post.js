const Validator = require('validator');

const isEmpty = require('../util/is-empty.js');

//see if there is a better way to do this validation class part
module.exports = function validatePostInput(data){
	let errors = {};
	
	//trim and initialize empty string for Validatory.AllMethods(strings)
	data.text = !isEmpty(data.text ? data.text.trim(): data.text) ? data.text.trim() : '' ;

	//validate text	
	if(!Validator.isLength(data.text, { min:2 , max:300 })){
		errors.text = "Post must be between 2 and 300 characters";
	}
	
	if(Validator.isEmpty(data.text)){
		errors.text = "Text field is required";
	}

	
	return {
		errors, // or just | errors: errors, |
		isValid: isEmpty(errors)
	}
	
}

