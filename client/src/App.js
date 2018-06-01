import React, { Component } from 'react';
import './css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Provider} from 'react-redux'; //Provider is the store and must wrap everything
import store from './util/store.js';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken.js';
import { setCurrentUser } from './actions/authActions.js';

//components
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Landing from  './components/layout/Landing.js';
import Login from  './components/auth/Login.js';
import Register from  './components/auth/Register.js';




//TODO same as loginAction. Can I merge it in a single locations?
//Check for token. -- Used to check authentication each time page is refreshed. 
if(localStorage.jwtToken){
	//Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	
	//Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	
	//Set user and isAuthenticated. can call any 'action' with 'store.dispatch(action)';
	store.dispatch(setCurrentUser(decoded)); 
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
	       	</div>
	       	
	       	<Footer />
	      </div>
      </Router>
     </Provider>
    );
  }
}

export default App;
