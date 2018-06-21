const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('../routes/api/users');
const posts = require('../routes/api/posts');
const profile = require('../routes/api/profile');

//brought in for production
const path = require('path');



const app = express();


// Body parser middleware (whats the difference between app.use and app.get)
// allows the use of "req.body" in models to get the values being passed back
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//DB config
const db = require('../config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then(()=> console.log('Mongo Connected'))
	.catch(err => console.log(err));


//Passport middleware
app.use(passport.initialize());

//Passport Config
require('../config/passport_config.js')(passport);


//Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

//Server static assests if in productions. - Routes added for production after front finished
if(process.env.NODE_ENV === 'production'){
	//Set static folder
	app.use('client/build');
	
	app.get('*', (req,res)=>{
		//TODO: what does this do?
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}



const port = process.env.PORT || 5000; // first part is for running on Heroku

app.listen(port, ()=> console.log(`Server running on port: ${port}`));
