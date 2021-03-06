import React, { Component } from 'react';
//import cn from 'classnames';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

//bring in actions for 'register'
import { registerUser } from '../../actions/authActions.js';

//util components
import TextFieldGroup from '../common/TextFieldGroup.js';



// a 'container' is a react component that works with redux
class Register extends Component {
	
	constructor(){
		super();
		this.state = {
				name:'',
				email:'',
				password:'',
				password2:'',
				errors:{}
				
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	
	//Duplicate code in Login.js. Leave it be? 
	//This prevents '/register' from loading. (componentWillReceiveProps() does not stop it from loading) 
	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}
	
	
	
	render(){
		
		const { errors } = this.state;
//		const errors = this.state.errors; //same as above
				
		
		return(
				  <div className="register">
				    <div className="container">
				      <div className="row">
				        <div className="col-md-8 m-auto">
				          <h1 className="display-4 text-center">Sign Up</h1>
				          <p className="lead text-center">Create your DevConnector account</p>
				          {/*<form onSubmit={this.handleSubmit}>*/}
				          <form noValidate onSubmit={this.handleSubmit} /* noValidate stops browser validations of type='email' and probably dates too*/>
					          <TextFieldGroup 
					            	type="text" 
					            	error={errors.name} 
					            	placeholder="Name" 
					            	name="name" 
					            	value={this.state.name} 
					            	onChange={this.handleChange} 
					            	/*disabled="false"*/
					          />				          				        
				             
				             <TextFieldGroup 
				            	type="email" 
				            	error={errors.email} 
				            	placeholder="Email Address" 
				            	name="email" 
				            	value={this.state.email} 
				            	onChange={this.handleChange} 
					          	info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
				            	/*disabled="false"*/
					         /> 			            
				            
				            <TextFieldGroup 
				            	type="password" 
				            	error={errors.password} 
				            	placeholder="Password" 
				            	name="password" 
				            	value={this.state.password} 
				            	onChange={this.handleChange} 
				            	/*disabled="false"*/
					        />
				            
				            <TextFieldGroup 
				            	type="password" 
				            	error={errors.password2} 
				            	placeholder="Confirm Password" 
				            	name="password2" 
				            	value={this.state.password2} 
				            	onChange={this.handleChange} 
				            	/*disabled="false"*/
				            />
				            
				            <input type="submit" className="btn btn-info btn-block mt-4" />
				          </form>
				        </div>
				      </div>
				    </div>
				  </div>
		)
	}
	
	
	handleChange(ev){
//		console.log("ping");
		this.setState({[ev.target.name]: ev.target.value}); //I like this method. 
	}
	
	handleSubmit(ev){
//		console.log("ping");
		ev.preventDefault();
		
		const newUser = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				password2: this.state.password2
		}
		
//		console.log(newUser);
						
//		this.props.registerUser(newUser);
		this.props.registerUser(newUser, this.props.history); //because we are trying to redirect from 'action'. Could use a redirect in render() that looks at a value in the store.
	}
	
	
}


Register.propTypes = {
		registerUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired
}



//const mapStateToProps = (state) => ({});
//why use above instead of the below. What do the () do? works as a "ifTrue && (Do this)"

//the "state" means the store and the props mean the components
const mapStateToProps = (state) => {
	
//	console.log("state",state);
	return {
		//should I return this? might not have to since it's only one line.
		auth: state.auth, //state.'auth' comes from the 'auth: ' in rootReducer (in "reducers/index.js")
		errors: state.errors
	}
};


//export default Register;
//export default connect(state (store state?) , {actions})(Register);
//export default connect(mapStateToProps, {registerUser})(Register);
export default connect(mapStateToProps, {registerUser})(withRouter(Register)); //need 'withRouter' for redirecting page from 'action'. Could use a redirect in render() that looks at a value in the store.