import React, { Component } from 'react';
import cn from 'classnames';

//alternative to "Fetch". Dependencies only setup in dev.
import axios from 'axios';



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
				            <div className="form-group">
				              <input type="text" className= {cn('form-control form-control-lg', { 'is-invalid': errors.name }) } placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} /*required*/ />
				              {/*errors.name? (<div className= 'invalid-feedback'>{errors.name}</div>):"" // below does the same thing*/}
				              {errors.name && (<div className= 'invalid-feedback'>{errors.name}</div>)}
				             </div>
				            <div className="form-group">
				              <input type="email" className={cn('form-control form-control-lg', { 'is-invalid': errors.email }) } placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleChange} />
				              {errors.email && (<div className= 'invalid-feedback'>{errors.email}</div>)}
				              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
				            </div>
				            <div className="form-group">
				              <input type="password" className={cn('form-control form-control-lg', { 'is-invalid': errors.password }) } placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
				              {errors.password && (<div className= 'invalid-feedback'>{errors.password}</div>)}
				             </div>
				            <div className="form-group">
				              <input type="password" className={cn('form-control form-control-lg', { 'is-invalid': errors.password2 }) } placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.handleChange} />
				              {errors.password2 && (<div className= 'invalid-feedback'>{errors.password2}</div>)}
				            </div>
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
		
		//Will be replaced by Redux. Currently used in Dev only
		//axios - uses proxy in server file to skip the http ~ 5000
		axios.post('/api/users/register', newUser)
			.then(res => {
				console.log("res", res);
			})
			.catch(err => this.setState({ errors: err.response.data }));
		
		
	}
	
	
}

export default Register;