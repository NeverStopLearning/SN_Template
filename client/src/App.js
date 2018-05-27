import React, { Component } from 'react';
import './css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Landing from  './components/layout/Landing.js';
import Login from  './components/auth/Login.js';
import Register from  './components/auth/Register.js';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
