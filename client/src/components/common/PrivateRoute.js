import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//test user's authentication then redirect to private routes.
//const PrivateRoute = ({component: Component, auth, ...rest}) => (
const PrivateRoute = ({component: Component, auth, ...rest}) => (
				
		<Route 
			{...rest}
			render = { props =>
				auth.isAuthenticated === true ? 
						( <Component {...props}  /> ) :
						( <Redirect to = "/login" /> )	
			
			}
			
		/>			
		

);

/* //Test to see if this is the same as '({})' since '()' is a shorthand for 'return'
 const PrivateRoute = ({component: Component, auth, ...rest}) => {
	
	return(
			<Route 
			{...rest}
			render = {
					{...rest}
					render = { props =>
					auth.isAuthenticate === true ? 
							return <Component {...props}  /> :
					return <Redirect to = "/login" />	
					}
			}
			
			/>
			
	)
	
};
*/
PrivateRoute.propTypes = {
		auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
	auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute);