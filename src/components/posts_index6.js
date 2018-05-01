import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
//react automatically call this func,when
//this component shows up in the page.
  componentDidMount() {
   this.props.fetchPosts(); //first Ojbect
  }
//map over all list of posts fetched
//this.props.posts is obj, it has no method map.
//(this.props.posts.map : not working !)
//use _.mpa(Object, 2ndFunc) -> passing Obj to 2nd function
//, which is mapping post to post.id, post.title
  renderPosts() {
   return _.map(this.props.posts, post => {
     return (
       <li className="list-group-item" key={post.id}>
        <Link to={`/posts/${post.id}`}>
         {post.title}
        </Link>
       </li>
     );
   });
  }

  render() {
//Object containing all posts fetched
    //console.log(this.props.posts); //Second Obj
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post_posts_index5
          </Link>
        </div>
        <h3>Posts Index5</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

//export default PostsIndex;  //1
//export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);
/*Passing action creator(fetchPosts) itself.
We can access this.props.fetchPosts inside
PostsIndex component using connect.*/
//export default connect(null, {fetchPosts})(PostsIndex);
/* null : since not pass state to mapStateToPrpos */
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
