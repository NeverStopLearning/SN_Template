//'process.env' is using the environment variables available  on the server. 'MONGO_URI' is basically variable name
module.exports = {
		mongoURI: process.env.MONGO_URI,
		secretOrKey: process.env.SECRET_OR_KEY

};