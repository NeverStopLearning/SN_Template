//Profile Display Container
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


//components
import ProfileHeader from './ProfileHeader.js';
import ProfileAbout from './ProfileAbout.js';
import ProfileCreds from './ProfileCreds.js';
import ProfileGithub from './ProfileGithub.js';

import Spinner from '../common/Spinner.js';

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
		
		const { profile, loading } = this.props.profile;
		let profileContent;
		
		if(profile === null || loading){
			profileContent = <Spinner />
		}
		else{
			profileContent = (
					<div>
						<div className = "row">
							<div className = "col-md-6">
								<Link to="/profiles" className="btn btn-light mb-3 float-left">
									Back To Profile List
								</Link>
							</div>
							<div className = "col-md-6" />
							
							
						</div>
							
						<ProfileHeader profileData={profile} />
						<ProfileAbout />
						<ProfileCreds />
						<ProfileGithub />	
					</div>
			)
		}
		
		return(
				<div className = "profile">
					<div className = "container">
						<div className = "row">
							<div className = "col-md-12">
								{profileContent}
							</div>
						</div>
					</div>
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
