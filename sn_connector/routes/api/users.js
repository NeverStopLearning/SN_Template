const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load keys
const keys = require('../../config/keys.js');


//Load Input Validation
const validateRegisterInput = require('../../validations/register.js');
const validateLoginInput = require('../../validations/login.js');

//Load User model
const User = require('../../models/User.js');


//@route  GET api/users/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

//@route  POST api/users/register
//@desc   Register user
//@access Public
router.post('/register', (req, res) => {
	
//Add during Validations. Using "destructuring"---
//	console.log('req.body', req.body);
	const { errors, isValid } = validateRegisterInput(req.body);
//	console.log('errors', errors);
//	console.log('isValid', isValid);
	
	//Check Validation
	if(!isValid){
//		console.log('ping2');
		return res.status(400).json(errors);
	}
	
//----
	
	User.findOne({ email: req.body.email })
		.then(user => {
//			console.log('ping3');
			if(user){
//				return res.status(400).json({email: 'Email already exist'});
//				console.log('ping4');
				errors.email = 'Email already exist';
				return res.status(400).json(errors.email);
				
			}
			else{
				
				const avatar = gravatar.url(req.body.email, {
					s: '200',   //Size
					r: 'pg',	//Rating
					d: 'mm'     //Default
				});
				
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar, // matching names can be just | avatar, | in es6
					password: req.body.password
				});
				
				bcrypt.genSalt(10, (err, salt) => {//what is '10' managing again?
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err){
							throw err;
						}
						
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});
				
			}
		})
		.catch(err => console.log(err));
});


//@route  POST api/users/login
//@desc   Login user/ Returning JWT token
//@access Public
router.post('/login', (req, res) => {
	
	//--Duplicate code for validations. can I merge somewhere.-------
	
	const { errors, isValid } = validateLoginInput(req.body);

	//Check Validation
	if(!isValid){

		return res.status(400).json(errors);
	}
	
	//-----------------------------------
	
	
	
	//going to be sent a 'Form'. Get it from 'req.body'
	const email = req.body.email;
	const password = req.body.password;
	

	//Find user by email.
	User.findOne({email : email})
		.then( user => {
		
			//-----------
			//TODO Fix this so that hackers cant tell if this is a user or not. 
			//Check for user
			if(!user){
				//return res.status(404).json({ email: 'User not found' });
				errors.email = "User not found";
				return res.status(404).json(errors);
			}
			
			// Check Password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch){
						//res.json({ msg:'Success' });
						
						//User Matched
						
						
						//Create JWT payload
						const payload = { 
								id: user.id, // would changing this name change how we call "req.user.id" in other passport auth routes?
								name: user.name,
								avatar: user.avatar
						}
						
						// Sign Token
						jwt.sign(payload, 
								keys.secretOrKey, 
								{expiresIn: 28800 }, // should make this a config file var? -- one hour in seconds = 3600 | 8hours in seconds = 28800
								(err, token)=>{
		 							res.json({
										success: true,
										token: 'Bearer '+ token
									});
								}
						); //3600ms = 1h?
						
					}
					else {
						//return res.status(400).json({ password: 'Password incorrect' });
						errors.password = "Password incorrect";
						return res.status(400).json(errors);
						
					}
					
					
				});

			//-----
			
		});
	//.catch(err => console.log(err));
	
});


//@route  GET api/users/current
//@desc   test the token / returns the current users
//@access Private
router.get('/current', 
		passport.authenticate('jwt',{ session: false }),
		(req, res) => {
			//res.json({msg: 'Success'});
			res.json({
				id: req.user.id, 
				name: req.user.name,
				email: req.user.email,
				avatar: req.user.avatar
			});
		}
);

module.exports = router;
