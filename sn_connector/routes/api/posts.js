const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load models
const Post = require('../../models/Post.js');
const Profile = require('../../models/Profile.js');

//Load Input Validations
const validatePostInput = require('../../validations/post.js');





//@route  GET api/posts/test
//@desc   Tests post route
//@access Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));



//@route  POST api/posts
//@desc   Create post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	//--Duplicate code for validations. can I merge somewhere.-------
	
	const { errors, isValid } = validatePostInput(req.body);

	//Check Validation
	if(!isValid){

		return res.status(400).json(errors);
	}
	
	//-----------------------------------

	const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.name, //not sure why this is like this but wait til the end to see if this works
			user: req.user.id
	})
	
	newPost.save().then(post => res.json(post));
	
});



//@route  GET api/posts
//@desc   Get all post // may need to set this up to take a user instead of date. (does it already default and use the current users as a filter) All post may be many. Whould I ever need all post not filtered by a user or a date? Maybe something using the API might?
//@access Public
router.get('/', (req, res)=> {
	const errors = {}; //remove if add validations
	
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => {
			errors.post = "No posts found";
			return res.status(404).json( errors );
		});
});


//@route  GET api/posts/:id
//@desc   Get post by id // May need to manage the number returned
//@access Public
router.get('/:id', (req, res)=> {
	const errors = {}; 
	
	Post.findById(req.params.id)
		.then(posts => res.json(posts))
		.catch(err => {
			errors.post = "No posts found with this id";
			return res.status(404).json( errors );
		});
});


//@route  DELETE api/posts
//@desc   Delete post
//@access Private
router.delete('/:id', passport.authenticate('jwt',{ session:false }), ( req, res) => {
	const errors = {};
	
	Profile.findOne({ user:req.params.id })
		.then(profile => {
			
			Post.findById(req.params.id)
				.then(post => {
					//Check for post owner
					const postUser = post.user.toString(); //post.user returns a string buffer. Thats probably y we need toString();
//					console.log("postUser", postUser);
					if(postUser !== req.user.id){
						errors.post = "Unauthorized";
						return res.status(401).json();
					}
					
					//Delete //should I add a catch for an errors?
					post.remove().then(()=> res.json({ success: true }));
					
				})
				.catch(err => {
					errors.post = "No posts found with this id";
					return res.status(404).json( errors );
				});
			
		})
		.catch(err => {
			errors.post = "No posts found with this id";
			return res.status(404).json( errors );
		});
});


module.exports = router;