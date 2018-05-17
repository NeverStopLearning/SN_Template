const Validator = require('validator');

const isEmpty = require('../util/is-empty.js');

module.exports = function validateRegisterInput(data){
	let errors = {};
	
	if(!Validator.isLength(data.name.trim(), { min:2, max: 30})){
		errors.name = "Name must be between 2 and 30 characters";
	}
	
	//console.log('isEmpty(errors)', isEmpty(errors));
	return {
		errors : errors, // or just | errors, |
		isValid: isEmpty(errors)
	}
	
}