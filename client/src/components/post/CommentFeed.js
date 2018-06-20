import React, { Component } from 'react';
import PropTypes from 'prop-types';

//component
import CommentItem from './CommentItem.js';


class CommentFeed extends Component {
	render(){
		
		const {comments, postId} = this.props;
		
		return comments.map(comment => (
				<CommentItem key={comment._id} comment={comment} postId={postId} /> 
		));
	}
}


CommentFeed.propType = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};


export default CommentFeed;
