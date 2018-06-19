import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';

//util
import PropTypes from 'prop-types';

//components
import Spinner from '../common/Spinner.js';
import PostFeed from './PostFeed.js';

//view
import PostForm from './PostForm.js';

//actions
import { getPosts } from '../../actions/postActions.js'; 


class Posts extends Component {
	
	componentDidMount(){
		this.props.getPosts();
	}
	
	render(){
		
		const { posts, loading } = this.props.post;
		let postContent;
		
		if(posts === null || loading){
			postContent = <Spinner />;
		}
		else{
			postContent = <PostFeed posts={posts} />
		}
		
		
		
		return(
				<div className="feed">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<PostForm />
								{postContent}
							</div>
						</div>
					</div>
				</div>
		)
	}
}

Posts.propTypes ={
		post: PropTypes.object.isRequired,
		getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
		post: state.post
});


export default connect(mapStateToProps, { getPosts })(Posts);