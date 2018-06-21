import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


//'Moment' library to format dates
import Moment from 'react-moment';

//actions
import { deleteEducation } from '../../actions/profileActions.js';






class Education extends Component {

	
	render(){

		const eduData = this.props.eduData.map(edu => {
	
			return(
				<tr key={edu._id}>				 
					<td>{edu.school}</td>
					<td>{edu.degree}</td>					
					<td>{edu.fieldofstudy}</td>					
					<td> 
						<Moment format="MM/DD/YYYY">{edu.from}</Moment>
						{' '} - {' '}
						{edu.current || edu.to === null ? "current" : <Moment format="MM/DD/YYYY">{edu.to}</Moment>}
					</td>
					<td> <button className="btn btn-danger" onClick={this.handleDelete.bind(this, edu._id)}>Delete</button> </td>
				</tr>
			)
		});

	
		
		
		return(
				<div>
					
					<h4 className="mb-4"> Education: </h4>
					<table className="table">
						<thead>
							<tr>
								<th>School</th>
								<th>Degree</th>
								<th>Field of Study</th>
								<th>Years</th>
								<th></th>
							</tr>							
						</thead>
						<tbody>
							{eduData}
						</tbody>
					</table> 
					
				</div>
		)
	}
	
	handleDelete(id, ev){
		this.props.deleteEducation(id);
	}
}


Education.propTypes = {
		deleteEducation: PropTypes.func.isRequired
};


export default connect(null, { deleteEducation })(Education);