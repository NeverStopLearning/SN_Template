import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import TextFieldGroup from '../common/TextFieldGroup.js';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.js';
import SelectListGroup from '../common/SelectListGroup.js';
import InputGroup from '../common/InputGroup.js';

import isEmpty from '../../validations/is-empty.js';

//action
import {createProfile, getCurrentProfile } from '../../actions/profileActions.js';

//when using this.props.history to redirect from action. Need to use withRouter
import { Link, withRouter } from 'react-router-dom';


//TODO: Bug - errors don't disappear after received. submit and return and incorrect url errors still there

class EditProfile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
				displaySocialInputs:false,
				handle:'',
				company:'',
				website:'',
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
		
		this.socialInputs = this.socialInputs.bind(this);
	}
	
	
	componentDidMount(){
		this.props.getCurrentProfile();
	}
	
	
	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({ errors: nextProps.errors });
		}
		
		
		
		/*console.log('nextProps',nextProps);
		
		console.log("nextProps.profile && nextProps.profile.profile: "+(nextProps.profile && nextProps.profile.profile));
		*/
		if(nextProps.profile && nextProps.profile.profile){ //will there always be a nextProps.profile? Look more into nextProps
//			console.log('ping');
			
			const profile = nextProps.profile.profile;
			
			//Convert 'skills' array back to CSV (comma separated values)
			const skillsCSV = profile.skills.join(',');
			
			//If profile field doesn't exist,  make empty string. (Is there a better way to do this? Object.keys()? loop over all values inside some how?)
			profile.company = !isEmpty(profile.company) ? profile.company: '';
			profile.website = !isEmpty(profile.website) ? profile.website: '';
			profile.location = !isEmpty(profile.location) ? profile.location: '';
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio: '';
			
			//the below seems like it might give errors at some point. Review this area
			profile.social = !isEmpty(profile.social) ? profile.social: {};
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter: '';
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook: '';
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin: '';
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube: '';
			profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram: '';
			
			
			
			//Set component field's state
			this.setState({
				handle: profile.handle,
				company:profile.company,
				website:profile.website,
				location:profile.location,
				status:profile.status,
				skills:skillsCSV,
				githubusername:profile.githubusername,
				bio:profile.bio,
				twitter:profile.twitter,
				facebook:profile.facebook,
				linkedin:profile.linkedin,
				youtube:profile.youtube,
				instagram:profile.instagram
			});
		}
	}
	
	
	
	render(){
		
		const { errors, displaySocialInputs } = this.state;
		
		const socialInputs = this.socialInputs(displaySocialInputs, errors);
		
		//Select options for status
		const options = [
			{ label:'* Select Professional Status', value:0 },
			{ label:'Developer', value:'Developer' },
			{ label:'Junior Developer', value:'Junior Developer' },
			{ label:'Senior Developer', value:'Senior Developer' },
			{ label:'Manager', value:'Manager' },
			{ label:'Student or Learning', value:'Student or Learning' },
			{ label:'Instructor or Teacher', value:'Instructor or Teacher' },
			{ label:'Intern', value:'Intern' },
			{ label:'Other', value:'Other' }
		];
		
		
		return(
				<div className="create-profile">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								
								<Link to="/dashboard" className="btn btn-light">Go Back</Link>
								<h1 className="display-4 text-center">Edit Profile</h1>
								
								<small className="d-block pb-3">* = required fields</small>
							
								<form onSubmit={this.handleSubmit}>
								
									<TextFieldGroup 
										placeholder="* Profile Handle"
										name="handle" 	 
										value={this.state.handle}
										onChange={this.handleChange}
										error={errors.handle}
										info="A unique handle for your profile.(is this the '/name' for the url or the profile name?) Your full name, company name, nickname, ect."
											
									/>
											
									<SelectListGroup 
										placeholder="Status"
										name="status" 	 
										value={this.state.status}
										onChange={this.handleChange}
										error={errors.status}
										options = {options}
										info="Give us and idea of where you are at in your career"
										
									/>
								
									<TextFieldGroup 
										placeholder="Company"
										name="company" 	 
										value={this.state.company}
										onChange={this.handleChange}
										error={errors.company}
										info="Could be your own company or on you work for"
												
									/>
																															
									<TextFieldGroup 
										placeholder="Website"
										name="website" 	 
										value={this.state.website}
										onChange={this.handleChange}
										error={errors.website}
										info="Could be you own or a company website"
												
									/>											
											
									<TextFieldGroup 
										placeholder="Location"
										name="location" 	 
										value={this.state.location}
										onChange={this.handleChange}
										error={errors.location}
										info="City & state suggested (e.g. Boston, MA)"
												
									/>
											
									<TextFieldGroup 
										placeholder="* Skills"
										name="skills" 	 
										value={this.state.skills}
										onChange={this.handleChange}
										error={errors.skills}
										info="Please use comma separated values (e.g. HTML, CSS, JavaScript, and PHP)"
													
									/>
											
									<TextFieldGroup 
										placeholder="Github Username"
										name="githubusername" 	 
										value={this.state.githubusername}
										onChange={this.handleChange}
										error={errors.githubusername}
										info="If you want your latest repos and a Github link, include you username"
												
									/>
											
									<TextAreaFieldGroup 
										placeholder="A short bio of yourself"
										name="bio" 	 
										value={this.state.bio}
										onChange={this.handleChange}
										error={errors.bio}
										info="If you want your latest repos and a Github link, include you username"
												
									/>
											
											
									<div className="mb-3">
										<button className="btn btn-light" type="button" 
											onClick={()=>{ //TODO look into where prevState came from. Are there others?
//												ev.preventDefault();// needed this because i forgot the "type" it was defaulting to type of 'submit'
												this.setState(prevState => ({
													displaySocialInputs: !prevState.displaySocialInputs
												}));
											
											}} >
											Add Social Network Links
										</button>
										<span className="text-muted">Optional</span>
									</div>
									
									{socialInputs}
									
									<input type="submit" value="Submit" className=" btn btn-info btn-block mt-4" />
										
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
		ev.preventDefault();
		
		const profileData = {
			handle: this.state.handle,
			company:this.state.company,
			website:this.state.website,
			location:this.state.location,
			status:this.state.status,
			skills:this.state.skills,
			githubusername:this.state.githubusername,
			bio:this.state.bio,
			twitter:this.state.twitter,
			facebook:this.state.facebook,
			linkedin:this.state.linkedin,
			youtube:this.state.youtube,
			instagram:this.state.instagram	
		};
		
		
		this.props.createProfile(profileData, this.props.history);
	};
	
	
	socialInputs(display, errors){
		
		if(display){
			return (
					<div>
						<InputGroup
							placeholder="Twitter Profile URL"
							name="twitter"
							icon="fab fa-twitter"
							value={this.state.twitter}
							onChange={this.handleChange}
							error={errors.twitter}
						
						/>

						<InputGroup
							placeholder="Facebook Page URL"
							name="facebook"
							icon="fab fa-facebook"
							value={this.state.facebook}
							onChange={this.handleChange}
							error={errors.facebook}
						
						/>
						
						<InputGroup
							placeholder="Linkedin Profile URL"
							name="linkedin"
							icon="fab fa-linkedin"
							value={this.state.linkedin}
							onChange={this.handleChange}
							error={errors.linkedin}
						
						/>
						
						<InputGroup
							placeholder="Youtube Channel URL"
							name="youtube"
							icon="fab fa-youtube"
							value={this.state.youtube}
							onChange={this.handleChange}
							error={errors.youtube}
						
						/>
						
						<InputGroup
							placeholder="Instagram Page URL"
							name="instagram"
							icon="fab fa-instagram"
							value={this.state.instagram}
							onChange={this.handleChange}
							error={errors.instagram}
						
						/>
						
					</div>
			)
		}
		
	}
	
}


EditProfile.propTypes = {
		profile: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		createProfile:PropTypes.func.isRequired,
		getCurrentProfile:PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});


export default connect(mapStateToProps, {createProfile,getCurrentProfile})(withRouter(EditProfile));