import React, { Component } from 'react';
//import cn from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//bring in actions for 'register'
import { loginUser } from '../../actions/authActions.js';

//util components
import TextFieldGroup from '../common/TextFieldGroup.js';


class Login extends Component {
	
	constructor(){
		super();
		
		this.state={
				email:'',
				password:'',
				errors:{}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	
	//Duplicate code as below. Turn into a function. 
	//This prevents '/login' from loading. (componentWillReceiveProps() does not stop it from loading) 
	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
//			console.log("nextProps.auth.isAuthenticated: ", nextProps.auth.isAuthenticated);
			this.props.history.push('/dashboard');
		}

		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}
	
	render(){
		
		const { errors } = this.state;
		
		return(
				<div className="login">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Log In</h1>
			          <p className="lead text-center">Sign in to your DevConnector account</p>
			          <form onSubmit={this.handleSubmit}>
			          
			            <TextFieldGroup 
			            	type="email" 
			            	error={errors.email} 
			            	placeholder="Email Address" 
			            	name="email" 
			            	value={this.state.email} 
			            	onChange={this.handleChange} 
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
			            
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
		)
	}
	
	
	handleChange(ev){
		this.setState({ [ev.target.name]: ev.target.value });
	}
	
	handleSubmit(ev){
//		console.log(ev);
//		ev.persist(); interesting function

		ev.preventDefault();
		
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		
		
		//TODO remove test;
//		console.log(userData);
		this.props.loginUser(userData);
	}
	
	
}


Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};


const mapStateToProps =(state) => ({
	auth: state.auth,
	errors: state.errors
});

//export default Login;
//export default connect(App state i think, action )(Component);
export default connect(mapStateToProps, {loginUser})(Login);