import React, { Component } from 'react';

//implementing redux
import {connect} from 'react-redux';
//import ProPTypes from 'prop-types';

//actions
import { getCurrentProfile } from '../../actions/profileActions.js';

class Dashboard extends Component {
	
	componentDidMount(){
		this.props.getCurrentProfile();
	}
	
	render(){
		return(
				<div>
					<h1>Dashboard</h1>
				</div>
		)
	}
}

export default connect(null, {getCurrentProfile})(Dashboard);