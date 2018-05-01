import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
//react automatically call this func,when
//this component shows up in the page.
  componentDidMount() {
   this.props.fetchPosts();
  }
  render() {
//Object containing all posts fetched
    return (
      <div>
        Posts Index3
      </div>
    );
  }
}

//export default PostsIndex;
//export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);
/*Passing action creator(fetchPosts) itself.
We can access this.props.fetchPosts inside
PostsIndex component*/
export default connect(null, {fetchPosts})(PostsIndex);
/* null : since not pass state to mapStateToPrpos */
