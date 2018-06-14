import React, { Component } from 'react';

//validation
import isEmpty from '../../validations/is-empty.js';



class ProfileHeader extends Component {
	
	
	render(){
		
		const { profileData } = this.props;
		/*console.log(this.props);*/
		
		return(
			<div className="row">
	            <div className="col-md-12">
	              <div className="card card-body bg-info text-white mb-3">
	                <div className="row">
	                  <div className="col-4 col-md-3 m-auto">
	                    <img className="rounded-circle" src={profileData.user.avatar} alt="" />
	                  </div>
	                </div>
	                <div className="text-center">
	                  <h1 className="display-4 text-center">{profileData.user.name}</h1>
	                  {/* <p className="lead text-center">{profileData.company}{!isEmpty(profileData.location) ?   ` at ${profileData.location}` : null }</p> */}
	                  <p className="lead text-center">{profileData.company}{isEmpty(profileData.location) ? null : (<span> at {profileData.location}</span>) }</p>
	                  {/* <p>{!isEmpty(profileData.location) ? profileData.location : null }</p> */}
	                  <p>{isEmpty(profileData.location) ? null : profileData.location }</p>
	                  <p>
	                  
	                  	{isEmpty(profileData.website) ? null : (
	                  		<a className="text-white p-2" href="_blank">
	  	                      <i className="fas fa-globe fa-2x"></i>
	  	                    </a>	
	                  	)}
	                  	
	                  	{isEmpty(profileData.social && profileData.social.twitter) ? null : (
	                  		<a className="text-white p-2" href="_blank">
	   	                      <i className="fab fa-twitter fa-2x"></i>
	   	                    </a>
	   	                    
	                  	)}
	                  	
	                  	{isEmpty(profileData.social && profileData.social.facebook) ? null : (
	                  	    <a className="text-white p-2" href="_blank">
	   	                      <i className="fab fa-facebook fa-2x"></i>
	   	                    </a>
	   	                    	
	                  	)}
	                  	
	                  	{isEmpty(profileData.social && profileData.social.linkedin) ? null : (	                  		
	   	                    <a className="text-white p-2" href="_blank">
	   	                      <i className="fab fa-linkedin fa-2x"></i>
	   	                    </a>
	   	                    	
	                  	)}
	                  	
	                  	{isEmpty(profileData.social && profileData.social.instagam) ? null : (
	   	                    <a className="text-white p-2" href="_blank">
	   	                      <i className="fab fa-instagram fa-2x"></i>
	   	                    </a>
	                  	)}
	                  	
	                    
	                   
	                  </p>
	                </div>
	              </div>
	            </div>
	          </div>
		)
	}
}

export default ProfileHeader;
