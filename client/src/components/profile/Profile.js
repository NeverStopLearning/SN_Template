//Profile Display Container
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


//components
import ProfileHeader from './ProfileHeader.js';
import ProfileAbout from './ProfileAbout.js';
import ProfileCreds from './ProfileCreds.js';
import ProfileGithub from './ProfileGithub.js';

//import Spinner from '../common/Spinner.js';

//action
import { getProfileByHandle } from '../../actions/profileActions.js';



class Profile extends Component {

	componentDidMount(){
//		console.log('ping')
//		console.log(this.props.match.params);
		
		
		if(this.props.match.params.handle){
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
		
		
	}
	
	
	render(){
		return(
				<div>
					<ProfileHeader />
					<ProfileAbout />
					<ProfileCreds />
					<ProfileGithub />
					
				</div>
		)
	}
}


Profile.propTypes = {
		profile: PropTypes.object.isRequired,
		getProfileByHandle: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
