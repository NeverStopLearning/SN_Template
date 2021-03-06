import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';

//util
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.js';

//actions
import { addPost } from '../../actions/postActions.js';


class PostForm extends Component {
	
	constructor(props){
		super(props);
		
		this.state ={
			text:'',
			errors:{}
				
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	
	componentWillReceiveProps(newProps){ //does the name matter?
		if(newProps.errors){
			this.setState({ errors: newProps.errors});
		}
	/*	else{//will this fix the bug with errors being carried over?
			this.setState({ errors:{} });
		}
	*/	
	}
	
	
	
	
	render(){
		
		const {errors} = this.state; 
		
		return(
			  <div className="post-form mb-3">
	            <div className="card card-info">
	              <div className="card-header bg-info text-white">
	                Say Somthing...
	              </div>
	              <div className="card-body">
	                <form onSubmit={this.handleSubmit}>
	                  <div className="form-group">
		                  <TextAreaFieldGroup
		                  	placeholder="Create a post" 
		                  	name="text"
		                  	value={this.state.text}
		                  	onChange={this.handleChange} 
		                  	error={errors.text}
		                  />	                 
		              </div>
	                  <button type="submit" className="btn btn-dark">Submit</button>
	                </form>
	              </div>
	            </div>
	          </div>
		)
	}
	
	handleChange(ev){
//		console.log(ev.target);
		this.setState({ [ev.target.name]: ev.target.value });
	}
	
	handleSubmit(ev){
//		console.log("submit-ping");
		ev.preventDefault();
		
		const { user } = this.props.auth;
		
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		
		this.props.addPost(newPost);
		this.setState({ text:'' });
		
		
	}
}


PostForm.propTypes = {
		addPost: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
	auth: state.auth,
	errors:state.errors 
	
});

export default connect(mapStateToProps, { addPost })(PostForm);