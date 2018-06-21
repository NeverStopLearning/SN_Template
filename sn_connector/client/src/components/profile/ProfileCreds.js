import React, { Component } from 'react';


//util
import Moment from 'react-moment';
import PropTypes from 'prop-types';

//validation
import isEmpty from '../../validations/is-empty.js';


class ProfileCreds extends Component {
	render(){
		
		const { educationData, experienceData } = this.props;
		
		const expItems = experienceData.map(exp => (
				<li key={exp._id} className="list-group-item" >
					<h4>{exp.company}</h4>
					<p>
						<Moment format="MM/DD/YYYY" >{exp.from}</Moment>
						{' - '}
						{isEmpty(exp.to) ? "Current" : (<Moment format="MM/DD/YYYY" >{exp.to}</Moment>) }
					</p>
					
					<p> <strong>Position:</strong> {exp.title} </p>
					<p>
						{isEmpty(exp.location) ? null : (<span> <strong>Location: </strong> {exp.location}</span>) }
					</p>
					<p>
						{isEmpty(exp.description) ? null : (<span> <strong>Description: </strong> {exp.description}</span>) }
					</p>
					
				</li>
		));
		
		
		const eduItems = educationData.map(edu => (
				<li key={edu._id} className="list-group-item" >
					<h4>{edu.School}</h4>
					<p>
						<Moment format="MM/DD/YYYY" >{edu.from}</Moment>
						{' - '}
						{isEmpty(edu.to) ? "Current" : (<Moment format="MM/DD/YYYY" >{edu.to}</Moment>) }
					</p>
					
					<p> <strong>Degree: </strong> {edu.degree} </p>
					<p> <strong>Field Of Study: </strong> {edu.fieldofstudy} </p>
					<p>
						{isEmpty(edu.description) ? null : (<span> <strong>Description: </strong> {edu.description}</span>) }
					</p>
					
				</li>
		));
		
				
		return(
				<div className="row">
	            <div className="col-md-6">
	              <h3 className="text-center text-info">Experience</h3>
	              {expItems.length > 0 ? 
		            	( <ul className="list-group"> {expItems} </ul>)
		            		  :
		            	( <p className="text-center"> No Experience has been added </p>)
	              }
	              
	             
	            </div>
	            <div className="col-md-6">
	              <h3 className="text-center text-info">Education</h3>
	              {eduItems.length > 0 ? 
			            	( <ul className="list-group"> {eduItems} </ul>)
			            		  :
			            	( <p className="text-center"> No Education has been added </p>)
		          }
	            </div>
	          </div>

		)
	}
}

ProfileCreds.propTypes = {
		educationData: PropTypes.array.isRequired,
		experienceData: PropTypes.array.isRequired
};


export default ProfileCreds;
