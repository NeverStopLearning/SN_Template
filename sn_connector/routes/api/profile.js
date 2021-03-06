const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load keys - May not need
//const keys = require('../../config/keys.js');

//Load Input Validations
//const validateRegisterInput = require('../../validations/register.js');
//const validateLoginInput = require('../../validations/login.js');
const validateProfileInput = require('../../validations/profile.js');
const validateExperienceInput = require('../../validations/experience.js');
const validateEducationInput = require('../../validations/education.js');

//Load models
const User = require('../../models/User.js');
const Profile = require('../../models/Profile.js');





// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));


//@route  GET api/profile
//@desc   test the token / returns the current users profile 
//@access Private
router.get('/', 
		passport.authenticate('jwt',{ session: false }),
		(req, res) => {
//			res.json({msg: 'Success'});
			
			/*//--Duplicate code for validations. can I merge somewhere.-------
			
			const { errors, isValid } = validateProfileInput(req.body);

			//Check Validation
			if(!isValid){

				return res.status(400).json(errors);
			}
			
			//-----------------------------------
*/			
			const errors = {};
			
			Profile.findOne({ user: req.user.id })//mongoose function i believe. Seems to be used like 'jpa'
				.populate('user', ['name','avatar']) // ref 'user' from model field name. //available do to how Profile model is setup. 
				.then(profile => {  				
					
					if(!profile){						
						errors.noprofile = "There is no profile for this user";
						return res.status(400).json(errors);
					}
					res.json(profile);
				})
				.catch(err => res.status(400).json(err));
		}
);



//@route  POST api/profile
//@desc   Create or Edit user profile 
//@access Private
router.post('/', 
		passport.authenticate('jwt',{ session: false }),
		(req, res) => {
//			console.log("req.body", req.body);
			
//--Duplicate code for validations. can I merge somewhere.-------
			
			const { errors, isValid } = validateProfileInput(req.body);

			//Check Validation
			if(!isValid){

				return res.status(400).json(errors);
			}
			
			//-----------------------------------
			
			
			//Get fields
			const profileFields = {};
			profileFields.user = req.user.id;
			
//		console.log("req", req);
//		console.log("req.user.id", req.user.id );	
		
			
			if(req.body.handle) profileFields.handle = req.body.handle;
			if(req.body.company) profileFields.company = req.body.company;
			if(req.body.website) profileFields.website = req.body.website;
			if(req.body.location) profileFields.location = req.body.location;
			if(req.body.bio) profileFields.bio = req.body.bio;
			if(req.body.status) profileFields.status = req.body.status;
			if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
			
			//Skills - Spilt into array
			if(req.body.skills && typeof req.body.skills !== 'undefined') { // should this be a string "undefined"
				profileFields.skills = req.body.skills.split(',').map(item => item.trim()); //added map part to trim() each entry. Seems to work
			}
			
			//Social media
			profileFields.social = {}
			if(req.body.youtube) profileFields.social.youtube = req.body.youtube.trim();
			if(req.body.twitter) profileFields.social.twitter = req.body.twitter.trim();
			if(req.body.facebook) profileFields.social.facebook = req.body.facebook.trim();
			if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin.trim();
			if(req.body.instagram) profileFields.social.instagram = req.body.instagram.trim();

		
			//check if there is a profile or not
			Profile.findOne({ user: req.user.id })
				.then(profile => {
					
					if(profile){
						// Update existing profile
						Profile.findOneAndUpdate(
								{ user: req.user.id },
								{ $set: profileFields }, //TODO: what is '$set' ?
								{ new: true } //  | new: true | = return the updated data, aka data after update.
							)
							.then(profile => res.json(profile));
					}
					else{
						// Create new profile
						
						//check if handle exists.
						if(profileFields.handle){
							Profile.findOne({ handle: profileFields.handle }) //should I put something so handle will always be populated? Will undefinded return an error?
								.then(profile => {
									if(profile){
										errors.handle = "That handle already exists";
										res.status(400).json(errors);
									}
									
									//Save profile is none exists
									new Profile(profileFields).save().then(profile => res.json(profile)); //hows does the constructor pass in values work here
								});
						}
						else{
//							console.log();
							errors.handle= "No handle found";
							res.status(400).json(errors);
						}
					}
					
				});
			
		}
);



//@route  GET api/profile/handle/:handle
//@desc   Get profile by handle
//@access Public // can be private if we want. Just add the token passport setup
router.get('/handle/:handle',(req,res)=>{
	
	const errors = {};
	
	Profile.findOne({ handle: req.params.handle	 })
		.populate('user', ['name','avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json( errors );
			}
			return res.json(profile);
		})
		.catch(err => {
			errors.profile = "Error finding by handle";
			return res.status(404).json( errors );
		});
});




//@route  GET api/profile/user/:user_id
//@desc   Get profile by user_id
//@access Public // can be private if we want. Just add the token passport setup
router.get('/user/:user_id',(req,res)=>{
	
	const errors = {};
	
//	Profile.findOne({ _id: req.params.user_id })// this will look up the profile id when passed it (_id 5b034e58ba1a7020e8b6725a) user id and profile Id are different
	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name','avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json( errors );
			}
			return res.json(profile);
		})
		.catch(err => {
			errors.profile = "Error finding by user id";
			return res.status(404).json( errors );
		});
});




//@route  GET api/profile/all    // change this to a range. Depending on the number of users, this could cause problems when getting a larger number.
//@desc   Get all profile 
//@access Public // can be private if we want. Just add the token passport setup
router.get('/all',(req,res)=>{
	
	const errors = {};
	
//	Profile.findOne({ _id: req.params.user_id })// this will look up the profile id when passed it (_id 5b034e58ba1a7020e8b6725a) user id and profile Id are different
	Profile.find()
		.populate('user', ['name','avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = "There is no profile";
				return res.status(404).json( errors );
			}
			return res.json(profile);
		})
		.catch(err => {
			errors.profile = "Error finding all profiles";
			return res.status(404).json( errors );
		});
});




//@route  POST api/profile/experience // would this work when sending multiple educations inputs at once from the front? I feel like this may be forcing one at a time delivery
//@desc   Add experience to user's profile 
//@access Private 
router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res)=>{
	//--Duplicate code for validations. can I merge somewhere.-------
	
	const { errors, isValid } = validateExperienceInput(req.body);

	//Check Validation
	if(!isValid){

		return res.status(400).json(errors);
	}
	
	//-----------------------------------
	
	
	Profile.findOne({ user: req.user.id})
		.then(profile => {	
						
			const newExp = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description					
			};
			
			//Add to exp array in profile table
			profile.experience.unshift(newExp); //.push - adds to the bottom. | .unshift - adds to the top of the array (I think)
			
			//should i add a catch here to be save? I feel like I should
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => {
			errors.profile = "error finding profile";
			return res.status(404).json(errors);
		});
	
});




//@route  POST api/profile/education // would this work when sending multiple educations inputs at once from the front? I feel like this may be forcing one at a time delivery
//@desc   Add education to user's profile 
//@access Private 
router.post('/education', passport.authenticate('jwt', {session:false}), (req, res)=>{
	//--Duplicate code for validations. can I merge somewhere.-------
	
	const { errors, isValid } = validateEducationInput(req.body);

	//Check Validation
	if(!isValid){

		return res.status(400).json(errors);
	}
	
	//-----------------------------------
	
	
	Profile.findOne({ user: req.user.id})
	.then(profile => {
		
		const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description					
		};
		
		//Add to exp array in profile table
		profile.education.unshift(newEdu); //.push - adds to the bottom. | .unshift - adds to the top of the array (I think)
		
		profile.save().then(profile => res.json(profile));
	})
	.catch(err => {
		errors.profile = "error finding profile";
		return res.status(404).json(errors);
	});
	
	
});




//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete experience from user's experience section of profile 
//@access Private 
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
	
	
	Profile.findOne({ user: req.user.id})
	.then(profile => {
		//Get index of object to be removed // I should be able to do this without map
		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

// --- index experiment----		
//		const testIndex = profile.experience.indexOf({ _id:req.params.exp_id }); //y doesn't this work?

//		console.log("removeIndex: "+ removeIndex +" |  testIndex: "+ testIndex );
//--------------	
		
		//Splice selected out of array
		profile.experience.splice(removeIndex, 1);
		
		
		//Save changes
		profile.save().then(profile => res.json(profile));
	})
	.catch(err => {
		errors.profile = "error finding profile";
		return res.status(404).json(errors);
	});
	
	
});


//@route  DELETE api/profile/education/:edu_id
//@desc   Delete education from user's education section of profile 
//@access Private 
router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
	
	
	Profile.findOne({ user: req.user.id})
	.then(profile => {
		//Get index of object to be removed // I should be able to do this without map
		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
		
		//Splice selected out of array
		profile.education.splice(removeIndex, 1);
		
		
		//Save changes
		profile.save().then(profile => res.json(profile));
	})
	.catch(err => {
		errors.profile = "error finding profile";
		return res.status(404).json(errors);
	});
	
	
});



//@route  DELETE api/profile
//@desc   Delete account (user & profile ) //test successfully deleted a user with no profile. I should test it with a user that has a profile
//@access Private 
router.delete('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
	
	
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			
			User.findOneAndRemove({ _id: req.user.id })
				.then(()=>{
					res.json({ success: true });
				})
				.catch(err => {
					errors.profile = "error removing User";
					return res.status(404).json(errors);
				});
		})
		.catch(err => {
			errors.profile = "error removing profile";
			return res.status(404).json(errors);
		});
	
	
});


module.exports = router;














/*// ----original --------------------
const express = require('express');
const router = express.Router();


// @route  GET api/profile/test
// @desc   Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

module.exports = router;*/