import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';

//util
//import PropTypes from 'prop-types';

//components
//import Spinner from '../common/Spinner.js';

//view
import PostForm from './PostForm.js';

//actions
//import { addPost } from '../../actions/postActions.js'; 


class Posts extends Component {
	
		
	render(){
		return(
				<div className="feed">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<PostForm />
							</div>
						</div>
					</div>
				</div>
		)
	}
}

//Posts.propTypes ={};

//const mapStateToProps = (state) => ({});


export default connect(null)(Posts);