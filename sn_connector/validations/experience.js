const Validator = require('validator');

const isEmpty = require('../util/is-empty.js');

//see if there is a better way to do this validation class part
module.exports = function validateExperienceInput(data){
	let errors = {};
	
	//trim and initialize empty string for Validatory.isEmpty(string)
	data.title = !isEmpty(data.title ? data.title.trim(): data.title) ? data.title.trim() : '' ;
	data.company = !isEmpty(data.company ? data.company.trim(): data.company) ? data.company.trim() : '' ;
	data.from = !isEmpty(data.from ? data.from.trim(): data.from) ? data.from.trim() : '' ;

	//validate required fields
	if(Validator.isEmpty(data.title)){
		errors.title = "Title field is required";
	}
	
	if(Validator.isEmpty(data.company)){
		errors.company = "Company field is required";
	}
	
	if(Validator.isEmpty(data.from)){
		errors.from = "From date field is required";
	}
	
	
	
	return {
		errors, // or just | errors: errors, |
		isValid: isEmpty(errors)
	}
	
}






/*


//trim and initialize empty string for Validatory.isEmpty(string)
	data.handle = !isEmpty(data.handle ? data.handle.trim(): data.handle) ? data.handle.trim() : '' ;
	data.status = !isEmpty(data.status ? data.status.trim(): data.status) ? data.status.trim() : '' ;
	data.skills = !isEmpty(data.skills ? data.skills.trim(): data.skills) ? data.skills.trim() : '' ;

	
	//validate handle - order matters here so maybe use an "else if"
	if(!Validator.isLength(data.handle, { min:2, max:40 })){
		errors.handle = 'Handle must be between 2 and 40 characters';
	}
	
	if(Validator.isEmpty(data.handle)){
		errors.handle = "Profile handle is required"
	}
	

	//validate status
	if(Validator.isEmpty(data.status)){
		errors.status = "Status field is required";
	}
	
	//validate skills
	if(Validator.isEmpty(data.skills)){
		errors.skills = "Skill field is required";
	}
	
//	console.log("data", data)
	//validate optional urls for social media links and personal web site
	if(!isEmpty(data.website)){
		data.website = !isEmpty(data.website ? data.website.trim(): data.website) ? data.website.trim() : '' ;
		
		if(!Validator.isURL(data.website)){
//			console.log("ping2", data.website)
			errors.website = "Not a valid URL";
		}
	}
	
	if(!isEmpty(data.youtube)){
		data.youtube = !isEmpty(data.youtube ? data.youtube.trim(): data.youtube) ? data.youtube.trim() : '' ;

		if(!Validator.isURL(data.youtube)){
			errors.youtube = "Not a valid URL";
		}
	}
	
	if(!isEmpty(data.twitter)){
		data.twitter = !isEmpty(data.twitter ? data.twitter.trim(): data.twitter) ? data.twitter.trim() : '' ;

		if(!Validator.isURL(data.twitter)){
			errors.twitter = "Not a valid URL";
		}
	}
	
	if(!isEmpty(data.facebook)){
		data.facebook = !isEmpty(data.facebook ? data.facebook.trim(): data.facebook) ? data.facebook.trim() : '' ;

		if(!Validator.isURL(data.facebook)){
			errors.facebook = "Not a valid URL";
		}
	}
	
	if(!isEmpty(data.linkedin)){
		data.linkedin = !isEmpty(data.linkedin ? data.linkedin.trim(): data.linkedin) ? data.linkedin.trim() : '' ;

		if(!Validator.isURL(data.linkedin)){
			errors.linkedin = "Not a valid URL";
		}
	}
	
	if(!isEmpty(data.instagram)){
		data.instagram = !isEmpty(data.instagram ? data.instagram.trim(): data.instagram) ? data.instagram.trim() : '' ;

		if(!Validator.isURL(data.instagram)){
			errors.instagram = "Not a valid URL";
		}
	}
	
//	console.log("data", data)


*/