import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


//'Moment' library to format dates
import Moment from 'react-moment';

//actions
import { deleteExperience } from '../../actions/profileActions.js';






class Experience extends Component {
	/*constructor(){
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}	*/
	
	render(){
//		console.log(this.props);
		//should I create this outside the class? what would be the benefits?
		//'()' must have something to do with the returning of jsx/html-in-jsx?
//		const expData = this.props.expData.map(exp => ( 
//				<tr key={exp._id}> {/* y does this neeeeed a key? */}
//					<td>{exp.company}</td>
//					<td>{exp.title}</td>
//					<td>{exp.from} - {exp.current ? "current" : exp.to}</td>
//					<td> <button className="btn btn-danger">Delete</button> </td>
//				
//				</tr>
//		));
		
		
		//<td>{exp.from} - {exp.current ? "current" : exp.to}</td>		
		// y does this neeeeed a key? 
		const expData = this.props.expData.map(exp => {
	
			return(
				<tr key={exp._id}>				 
					<td>{exp.company}</td>
					<td>{exp.title}</td>					
					<td> 
						<Moment format="MM/DD/YYYY">{exp.from}</Moment>
						{' '} - {' '}
						{exp.current || exp.to === null ? "current" : <Moment format="MM/DD/YYYY">{exp.to}</Moment>}
					</td>
					<td> <button className="btn btn-danger" onClick={this.handleDelete.bind(this, exp._id)}>Delete</button> </td>
				</tr>
			)
		});

	
		
		
		return(
				<div>
					
					<h4 className="mb-4"> Experience: </h4>
					<table className="table">
						<thead>
							<tr>
								<th>Company</th>
								<th>Title</th>
								<th>Years</th>
								<th></th>
							</tr>							
						</thead>
						<tbody>
							{expData}
						</tbody>
					</table> 
					
				</div>
		)
	}
	
//	handleDelete(ev, id) this is still (ev = _id, id = env) 
	handleDelete(id, ev){
//		console.log('Delete ping ' , id);
		this.props.deleteExperience(id);
	}
}


Experience.propTypes = {
		deleteExperience: PropTypes.func.isRequired
};

//const mapStateToProps = (state) => ({});


export default connect(null, { deleteExperience })(Experience);