const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const PostSchema = new Schema({
	
	user:{
		type:Schema.Types.ObjectId,
		ref:'users'
	},
	text:{
		type: String,
		required: true
	},
	//separate from the 'user' above so that the post wont be deleted if user deletes their account.
	name:{
		type: String
	},
	avatar:{
		type: String
	},
	//-------
	likes:[
		//user is needed here so that the likes only count once person.
		{
			user:{
				type:Schema.Types.ObjectId,
				ref:'users'
			}
		}
	],
	comments:[
		{
			user:{
				type:Schema.Types.ObjectId,
				ref:'users'
			},
			text:{
				type: String,
				require: true
			},
			name:{
				type: String
			},
			avatar:{
				type: String
			},
			date:{
				type: Date,
				default: Date.now
			}
		}
	],
	date:{
		type: Date,
		default: Date.now
	}
	

	
	
	
});

module.exports = Post = mongoose.model("post", PostSchema);
