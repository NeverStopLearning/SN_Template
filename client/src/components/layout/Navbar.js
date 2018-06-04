import React, { Component } from 'react';
import {Link} from 'react-router-dom'; //<Link to="component"

//connecting to redux so nav bar can reflect user and state
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import cn from 'classnames';

//actions
import {logoutUser} from '../../actions/authActions.js';
import { clearCurrentProfile } from '../../actions/profileActions.js';

class Navbar extends Component {
	render(){
		
		const { isAuthenticated, user } = this.props.auth;
		
		return(
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			    <div className="container">
			      <Link className="navbar-brand" to="/">DevConnector</Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link" to="profiles"> Developers
			            </Link>
			          </li>
			        </ul>

			        {this.Links(isAuthenticated, user)}
			      </div>
			    </div>
			  </nav>
		)
	}
	
	
	Links(isAuthenticated, user){
//		{isAuthenticated ? authLinks : guestLinks} // Alternative to method	
//		console.log('---- PING -----');
//		console.log('isAuthenticated: ', isAuthenticated);
//		console.log('user: ', user);
		
		//??? Why is this 'var = ();' what is this style used for? 
		
		if(isAuthenticated){
			const authLinks = (
					<ul className="navbar-nav ml-auto">
			          <li className="nav-item">
			            <a className="nav-link" onClick={this.handleLogout.bind(this)} > 
			            	<img src={user.avatar} 
			            		alt={user.name} /* TODO can I set 'at' to a default generic profile image? or does that have to be done in the css? */
			            		title="You must have a Gravatar connected to your email to display a profile pic (Change this in the future)"
			            		className="rounded-circle"
			            		style={{width: '25px', marginRight: '5px'}}	
			            	/> 
			            	{' ' /* adds a little space */}Logout
			            </a>		          
			          </li>
			        </ul>
			);
			
			return authLinks;
		}
		else{
			const guestLinks = (
					<ul className="navbar-nav ml-auto">
			          <li className="nav-item">
			            <Link className="nav-link" to="/register">Sign Up</Link>
			          </li>
			          <li className="nav-item">
			            <Link className="nav-link" to="/login">Login</Link>
			          </li>
			        </ul>
			);
	
			return guestLinks;
		}	
		

	}
	
	handleLogout(ev){
		ev.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
		
//		this.props.history.push('/login');
//		this.props.history.push('/dashboard');
		
//		being done by 'PrivateRoute' in App.js
		//Redirect to login. --is this the best way to do this? I still like my global redirect idea. Look into it.
//		window.location.href = '/login';
		
		
	}
	
	
	
}


Navbar.propTypes ={
		logoutUser:PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired
};

//I'm pretty sure this is the "store"'s state.
const mapStateToProps = (state) => ({ // y is this '({})' instead of just '{}'
	auth: state.auth
});


//export default Navbar;
export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);