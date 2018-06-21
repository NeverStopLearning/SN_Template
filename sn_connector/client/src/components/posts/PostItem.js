import React, { Component } from 'react';

//util
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

//redux
import { connect } from 'react-redux';
 	
//actions
import { deletePost, addLike, removeLike } from '../../actions/postActions.js'; 


class PostItem extends Component {
	render(){
		
		const { post, auth, showActions } = this.props;
		
		return(
				<div className="card card-body mb-3">
	              <div className="row">
	                <div className="col-md-2">
	                  <Link to="/profile">
	                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
	                      alt="" />
	                  </Link>
	                  <br />
	                  <p className="text-center">{post.name}</p>
	                </div>
	                <div className="col-md-10">
	                  <p className="lead">
	                  	{post.text}
	                  </p>
	                  {showActions ? (
	                		<span>	                  
	                		  <button onClick={this.handleLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
		  	                    <i className={cn('fas fa-thumbs-up', {
		  	                    	'text-info': this.findUserLike(post.likes)
		  	                    })} ></i>
		  	                    <span className="badge badge-light">{post.likes.length}</span>
		  	                  </button>
		  	                  {/* TODO: make this only visible when user has as 'like' they can remove...or change colors to toggle a 'like'? */}
		  	                  <button onClick={this.handleUnlike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
		  	                    <i className="text-secondary fas fa-thumbs-down"></i>
		  	                  </button>
		  	                  
		  	                  <Link to={"/post/"+post._id} className="btn btn-info mr-1">
		  	                    Comments
		  	                  </Link>
		  	                  {post.user === auth.user.id ? 
		  	                		  (
		  	                		   <button onClick={this.handleDelete.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
		  	                                <i className="fas fa-times" />
		  			                   </button>
		  	                           )
		  	                           :
		  	                        	null
		  	                   }
		  	                  </span>
		                  )	                  
	                		  : null
	                  }
	                </div>
	              </div>
	            </div>
		)
	}
	
	handleDelete(id, ev){
//		console.log("id",id);
//		console.log("ev",ev);
		
		this.props.deletePost(id);
		
	}
	
	//---TODO: change this to a toggle action [ use findUserLike() ]----
	handleLike(id){
//		console.log(id);
		this.props.addLike(id);
	}
		
	handleUnlike(id){
//		console.log(id);
		this.props.removeLike(id);
	}
	//-------------
	
	findUserLike(likes){
		const { auth } = this.props;
		
		if(likes.filter(like => like.user === auth.user.id).length > 0 ){
			return true;
		}
		else{
			return false;
		}
		
	}
	
}


PostItem.propTypes = {
		auth: PropTypes.object.isRequired,
		post: PropTypes.object.isRequired,
		deletePost: PropTypes.func.isRequired,
		addLike: PropTypes.func.isRequired,
		removeLike: PropTypes.func.isRequired,
		showActions: PropTypes.bool
};

PostItem.defaultProps = {
		showActions: true
}

const mapStateToProps = (state) => ({
	auth: state.auth
});



export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);