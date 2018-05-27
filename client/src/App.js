import React, { Component } from 'react';
import './css/App.css';

import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Landing from  './components/layout/Landing.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Navbar />
       	<Landing />
       	<Footer />
      </div>
    );
  }
}

export default App;
