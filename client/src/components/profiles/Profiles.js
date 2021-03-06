//Profile List Display
import React, { Component } from 'react';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//components
import Spinner from '../common/Spinner.js';
import ProfileItem from './ProfileItem.js';

//actions
import { getProfiles } from '../../actions/profileActions.js';


class Profiles extends Component {
	
	/*constructor(props){
		super(props);
		
		
	}*/

	
	componentDidMount(){
		this.props.getProfiles();
	}
	
	
	render(){
		
		const { profiles, loading } = this.props.profile;
		let profileItems;
		
		if(profiles === null || loading){
			profileItems = <Spinner />
		}
		else{	// TODO: need to limit how many profiles are brought in at onces. AND add a search feature*/}

			if(profiles.length > 0){
				profileItems = profiles.map(profile => <ProfileItem key={profile._id} profileData={profile}  /> )
				
			}
			else{
				profileItems = <h4>No profiles found ...</h4>
			}
		}
		
		
		
		return(
				<div className="profiles">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								
								<h1 className="display-4 text-center"> Develeoper Profiles </h1>
								<p className="lead text-center"> 
									Browser and connect with developers
								</p>
								{profileItems}	
							</div>
						</div>
					</div>
				</div>
		)
	}
	
	
	
	
	//can I move this out of the render() method?
/*	init(){
		const { profiles, loading } = this.props.profile;
		let profileItems;
		
		if(profiles === null || loading){
			profileItems = <Spinner />
		}
		else{
			if(profiles.length > 0){
				<h1>TODO: Display Profiles here</h1>
				
			}
			else{
				profileItems = <h4>No profiles found ...</h4>
			}
		}
		
		return profileItems;
		
	}
*/	
	
}


Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});


export default connect(mapStateToProps, { getProfiles })(Profiles);