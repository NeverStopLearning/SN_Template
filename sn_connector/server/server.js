const express = require('express');
const mongoose = require('mongoose');

const users = require('../routes/api/users');
const posts = require('../routes/api/posts');
const profile = require('../routes/api/profile');


const app = express();

//DB config
const db = require('../config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then(()=> console.log('Mongo Connected'))
	.catch(err => console.log(err));


app.get('/', (req,res) => res.send("Hello"));


//Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000; // first part is for running on Heroku

app.listen(port, ()=> console.log(`Server running on port: ${port}`));
