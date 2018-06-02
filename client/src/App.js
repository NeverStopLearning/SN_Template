import React, { Component } from 'react';
import './css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Provider} from 'react-redux'; //Provider is the store and must wrap everything
import store from './util/store.js';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken.js';

//actions
import { setCurrentUser, logoutUser } from './actions/authActions.js';
import { clearCurrentProfile } from './actions/profileActions.js';

//components
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Landing from  './components/layout/Landing.js';
import Login from  './components/auth/Login.js';
import Register from  './components/auth/Register.js';
import Dashboard from  './components/dashboard/Dashboard.js';




//TODO same as loginAction. Can I merge it in a single locations?
//Check for token. -- Used to check authentication each time page is refreshed. 
if(localStorage.jwtToken){
	//Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	
	//Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	
	//??? whats the difference between using 'store.dispactch' and just 'dispatch'? When and Why?
	//Set user and isAuthenticated. can call any 'action' with 'store.dispatch(action)';
	store.dispatch(setCurrentUser(decoded)); 
	
	//Check for expired token. --??? Should probably add the check on rest calls too. look into best ways to do 'timed-out' functionality
	const currentTime = Date.now() / 1000; // dte/1000 because it's in milliseconds. 
	
//	console.log("currentTime: ", currentTime);
//	console.log("decoded.exp: ", decoded.exp);
//	console.log("decoded.exp < currentTime: "+ (decoded.exp < currentTime));
	
	
	if (decoded.exp < currentTime){
		//Logout user
		store.dispatch(logoutUser()); //maybe use store when {connect} is absent
		
		//Clear current Profile 
		store.dispatch(clearCurrentProfile());
	
		//Redirect to login. --is this the best way to do this? I still like my global redirect idea. Look into it.
		window.location.href = '/login'; //works but only on refresh. DOES NOT WORK when navigating from one /profile to /theNext.
		
	}
	
	
	
}



class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
	      <div className="App">
	      	<Navbar />
	       	<Route exact /* need 'exact' so it doesn't bring in all the paths with '/' like '/login'. Here it would bring in both without 'exact' */ 
	       		path="/" 
	       		component = {Landing}  />
	       	
	       	<div className="container">
	       		<Route exact path="/login" component={Login} />
	       		<Route exact path="/register" component={Register} />
	       		
	       		<Route exact path="/dashboard" component={Dashboard} />
	       	</div>
	       	
	       	<Footer />
	      </div>
      </Router>
     </Provider>
    );
  }
}

export default App;
