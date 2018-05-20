const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load keys - May not need
//const keys = require('../../config/keys.js');

//Load Input Validation
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
			//res.json({msg: 'Success'});
			
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
				.then(profile => {  				
					
					if(!profile){						
						errors.noprofile = "There is no profile for this user";
						return res.status(400).json(errors);
					}
					//res.json(profile);
				})
				.catch(err => res.status(400).json(err));
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