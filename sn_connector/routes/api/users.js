const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
	User.findOne({ email: req.body.email })
		.then(user => {
			if(user){
				return res.status(400).json({email: 'Email already exist'});
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
				
				bcrypt.genSalt(10, (err, salt) => {
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
	//going to be sent a 'Form'. Get it from 'req.body'
	const email = req.body.email;
	const password = req.body.password;
	
	console.log("ping");
	
	//Find user by email.
	User.findOne({email : email})
		.then( user => {
		
			//-----------
			//TODO Fix this so that hackers cant tell if this is a user or not. 
			//Check for user
			if(!user){
				return res.status(404).json({ email: 'User not found' });
			}
			
			// Check Password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch){
						res.json({ msg:'Success' });
					}
					else {
						return res.status(400).json({ password: 'Password incorrect' });
					}
					
					
				});

			//-----
			
		});
	//.catch(err => console.log(err));
	
});


module.exports = router;
