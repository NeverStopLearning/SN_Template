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




module.exports = router;














/*// ----original --------------------
const express = require('express');
const router = express.Router();


// @route  GET api/profile/test
// @desc   Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

module.exports = router;*/