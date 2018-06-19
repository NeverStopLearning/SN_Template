import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';

//util
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//components
import PostItem from '../posts/PostItem.js';
import Spinner from '../common/Spinner.js';

//actions
import { getPost } from '../../actions/postActions.js';



class Post extends Component {
	
	componentDidMount(){
		this.props.getPost(this.props.match.params.id); //TODO what is going on here?
	}
	
	render(){
		
		const { post, loading } = this.props.post;
		let postContent;
		
		if(post === null || loading || Object.keys(post).length === 0){
			postContent = (<Spinner />);
		}
		else{
			postContent = (
					<div>
						<PostItem post={post} showActions={false} /* y is this not a string? */ />
					</div>
			);
		}
		
		return(
				<div className="post">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Link to="/feed" className="btn btn-light mb-3" >
									Back To Feed
								</Link>
								{postContent}
							</div>
						</div>
					</div>
				</div>
		)
	}
}

Post.propTypes = {
		getPost: PropTypes.func.isRequired,
		post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post 	
});

export default connect(mapStateToProps, { getPost })(Post);
