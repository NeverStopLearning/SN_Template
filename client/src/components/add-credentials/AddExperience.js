import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//components
import TextFieldGroup from '../common/TextFieldGroup.js';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.js';

//action
import { addExperience } from '../../actions/profileActions.js';

//To fix the problem with errors not always being removed, look into adding a "onComponentUnload" if one or something
//Or add a variable in the error object that tells if the error has already been displayed. 
class AddExperience extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
				company:'',
				title:'',
				location:'',
				from:'',
				to:'',
				current:false,
				description:'',
				errors:{},
				disabled:false	
		};
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	}
	
	
	
	
	componentWillReceiveProps(nextProps){
//		console.log('ping');
		if(nextProps.errors){
			this.setState({ errors: nextProps.errors });
		}
	}
	
	render(){
		
		const { errors } = this.state;
//		console.log('render ', errors);
		return(
				<div className='add-experience'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-8 m-auto'>
							
								<Link to="/dashboard" className="btn btn-light">Go Back</Link>
								<h1 className="display-4 text-center">Add Experience</h1>
								
								<p className="lead text-center">List all jobs/positions held within the last 5 years</p>
								<small className="d-block pb-3">* = required fields</small>
								
								{/* Remember the 'noValidate' turns off browser validation. Would have been useful with dates and validation*/}
								<form noValidate onSubmit={this.handleSubmit}>
								
									<TextFieldGroup 
										placeholder="* Company"
										name="company"
										value={this.state.company}
										onChange={this.handleChange}
										error={errors.company}
									/>
									
									<TextFieldGroup 
										placeholder="* Job Title"
										name="title"
										value={this.state.title}
										onChange={this.handleChange}
										error={errors.title}
									/>
									
									<TextFieldGroup 
										placeholder="Location"
										name="location"
										value={this.state.location}
										onChange={this.handleChange}
										error={errors.location}
									/>
									
									<h6>From Date</h6>
									<TextFieldGroup 
										name="from"
										type="date"
										value={this.state.from}
										onChange={this.handleChange}
										error={errors.from}
									/>
									
									<h6>To Date</h6>
									<TextFieldGroup 
										name="to"
										type="date"
										value={this.state.to}
										onChange={this.handleChange}
										error={errors.to}
										disabled={this.state.disabled ? 'disabled':''}
									/>
									
									{/* Maybe make this checkbox a component */}
									<div className="form-check mb-4" >
										<input 
											type="checkbox"
											className="form-check-input"
											name="current"
											value={this.state.current}
											checked={this.state.current}
											onChange={this.handleCheck}
											id="current"
										
										/>
											
										<label htmlFor="current" className="form-check-label" >
											Current Job
										</label>		
									</div>
									
									<TextAreaFieldGroup 
										placeholder="Job Description"
										name="description"
										value={this.state.description}
										onChange={this.handleChange}
										error={errors.description}
										info="Tell us about the position"
									/>
									
									
									
									<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" /> 
								</form>
								
							</div>
						</div>
					</div>
				</div>
		)
	}
	
	
	
	
	handleCheck(){
		this.setState({ 
				current: !this.state.current, 
				disabled:!this.state.disabled 
			});
		
	}	
	
	
	handleChange(ev){
		this.setState({[ev.target.name]:ev.target.value});
	}
	
	
	handleSubmit(ev){
		ev.preventDefault();
		
//		console.log("ping");
		
		const expData = {
				company: this.state.company,
				title: this.state.title,
				location: this.state.location,
				from: this.state.from,
				to: this.state.to,
				current: this.state.current,
				description: this.state.description						
		}
		
		this.props.addExperience(expData, this.props.history);
		
	}
	
}


AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});



export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));


