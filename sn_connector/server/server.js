const express = require('express');
const mongoose = require('mongoose');

const auth = require('../routes/api/auth');
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
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000; // first part is for running on Heroku

app.listen(port, ()=> console.log(`Server running on port: ${port}`));