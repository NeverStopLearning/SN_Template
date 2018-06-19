import React, { Component } from 'react';

import PropTypes from 'prop-types';

//component
import PostItem from './PostItem.js';


class PostFeed extends Component {
	render(){
		
		const { posts } = this.props;
		
		return posts.map(post => (<PostItem key={post._id} post={post} />) )
	}
}


PostFeed.propTypes = {
		posts: PropTypes.array.isRequired
};

export default PostFeed;