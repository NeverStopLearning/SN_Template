if(process.env.NODE_ENV ==='production'){
	module.exports = require('./keys_prod.js');
}
else{
	module.exports = require('./keys_dev.js');
}

/*module.exports = {
		mongoURI:'mongodb://dbUser:dbUserPassword@ds121950.mlab.com:21950/dev_test',
		secretOrKey:'secretKey'

};*/