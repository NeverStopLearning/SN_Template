import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//components
import isEmpty from '../../validations/is-empty.js';



class ProfileItem extends Component {
	
	
	render(){
	
		const { profileData } = this.props;
		
		return(
				<div className="card card-body bg-light	mb-3">
					<div className="row">
					
						<div className="col-2">{/* work on this. Need to make sure all are mobile first*/}						
							<img src={profileData.user.avatar} alt="" className="rounded-circle" />
						</div>
							
						<div className="col-lg-6 col-md-4 col-8 ">
							<h3>
								<Link to={`/profile/${profileData.handle}`} className="">
									{profileData.user.name} 
								</Link>
							</h3>
							
							<p>
								{profileData.status} {isEmpty(profileData.company) ? null : (<span> at {profileData.company}</span>) }
							
							</p>
							
							<p>
								{isEmpty(profileData.location) ? null : (<span> {profileData.location}</span>) }
							
							</p>
							
							<Link to={`/profile/${profileData.handle}`} className="btn btn-info"> View Profile </Link>
							
						</div>
								
						<div className = "col-md-4 d-none d-md-block"> {/* Dont think I want this to 'not' show. I think it would be better to show below*/}
						
							<h4> Skill Set </h4>
							<ul className="list-group">
								{profileData.skills.slice(0,4).map((skill,index) => (
										<li key={index} className="list-group-item">
											<i className="fa fa-check pr-1" />
											{skill}
										</li>
								))}
							</ul>
						
						</div>
						
					</div>
				</div>
		)
	}
}


ProfileItem.propTypes = {
	profileData: PropTypes.object.isRequired
};

export default ProfileItem;
