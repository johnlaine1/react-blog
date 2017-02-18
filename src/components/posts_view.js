import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router';

class PostsView extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  componentDidMount() {
    this.props.fetchPost(this.props.params.id);
  }
  
  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
  }
  
  render() {
    const {post} = this.props;
    
    if (!post) {
      return <div>Loading...</div>;
    }
    
    return (
      
      <div className="">
        <Link to="/">Back to posts list</Link>
        <h2 className="">{post.title}</h2>
        <h6 className="">Categories: {post.categories}</h6>
        <p className="">{post.content}</p>
        <button 
          onClick={this.onDeleteClick.bind(this)}>
          Delete this post
        </button>
      </div>
    
    );
  }
}

function mapStateToProps(state) {
  return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsView);
