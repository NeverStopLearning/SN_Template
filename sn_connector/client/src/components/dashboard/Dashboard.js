import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//implementing redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions.js';

//components
import Spinner from '../common/Spinner.js';
import DashboardActionButtons from './DashboardActionButtons';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
	
	componentDidMount(){
		this.props.getCurrentProfile();
	}
	
	render(){
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		
		let dashboardContent;
		
		if(profile === null || loading){
			dashboardContent = <Spinner />;
		}
		else{
			//Check if logged in user has profile data
			if(Object.keys(profile).length > 0){
				dashboardContent = (
						<div className="lead text-muted" > {/*TODO: Look more into `` (backticks).*/}
							<p>Welcome <Link to={`/profile/${profile.handle}`} > {user.name} </Link></p>
							
							<DashboardActionButtons />
							
							{/* TODO: add exp and edu here */}
							<Experience expData={profile.experience} />
							<Education eduData={profile.education} />
							
							<div style={{ marginBottom:'60px' }} /> {/* should probably change to css instead of adding this inline */}

							<button className="btn btn-danger" onClick={this.handleDelete.bind(this)}> Delete Account </button>
							
						</div>						
				);
			}
			else{
				//User is logged in but has no profile
				dashboardContent = (
						<div>
							<p className="lead text-muted"> Welcome { user.name } </p>
							<p>You have not yet setup a profile, please add some info</p>
							<Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile </Link>
						</div>	
				);
			}
		}
		
		return(
				<div className = "dashboard">
					<div className = "container">
						<div className = "row">
							<div className = "col-md-12">
								<h1 className = "display-4">Dashboard</h1>
								{dashboardContent}
							</div>
						</div>
					</div>
				</div>
		)
	}

	handleDelete(ev){
		this.props.deleteAccount();
	}
	
	
	
}


Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

// y '=> ({ why this in ()? });'
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});
										// isn't this 'mapToDispatch()' or somthing?
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount })(Dashboard);