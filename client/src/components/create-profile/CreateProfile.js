import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import TextFieldGroup from '../common/TextFieldGroup.js';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup.js';
//import SelectListGroup from '../common/SelectListGroup.js';
//import InputGroup from '../common/InputGroup.js';


class CreateProfile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
				displaySocialInputs:false,
				handle:'',
				company:'',
				webside:'',
				location:'',
				status:'',
				skills:'',
				githubusername:'',
				bio:'',
				twitter:'',
				facebook:'',
				linkedin:'',
				youtube:'',
				instagram:'',
				errors: {}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	
	render(){
		return(
				<div className="create-profile">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								
								<h1 className="display-4 text-center">Create your profile</h1>
								<p className="lead text-center" >
									Let's get some information to make your profile standout.
								</p>
								<small className="d-block pb-3">* = required fields</small>
							
								<form onSubmit={this.handleSubmit}>
								
									<TextFieldGroup 
										placeholder="* Profile Handle"
										name="handle" 	 
										value={this.state.handle}
										onChange={this.handleChange}
										error={this.state.errors.handle}
										info="A unique handle for your profile.(is this the '/name' for the url or the profile name?) Your full name, company name, nickname, ect.(Currently can't be changed? should i allow this to be changed?)"
											
									/>
								
								
								</form>
								
							</div>
						</div>
					</div>
				</div>
		)
	}
	
	
	handleChange(ev){
		this.setState({[ev.target.name]: ev.target.value}); 
	}
	
	
	handleSubmit(ev){
//		ev.preventDefault();
	};
	
	
	
}


CreateProfile.propTypes = {
		profile: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});


export default connect(mapStateToProps)(CreateProfile);