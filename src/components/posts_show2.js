import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from  '../actions';

//match : objects that listed different
//wild token(:id/:commentId) existed inside url.
class PostsShow extends Component {
  componentDidMount() {
   const { id } = this.props.match.params;
   this.props.fetchPost(id); //action creator
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    // this.props === ownProps //Already in mapStateToProps
//the post we want to show.
    // posts[this.props.match.params.id]  //1
    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
/*
//function mapStateToProps(state) {
//big old list of posts containing all the diff obj
//inside the application.
function mapStateToProps({ posts }) {
  return { posts };
} */
/* return only single post with a specific id instead of
all posts.
ownProps is heading to PostsShow component*/
function mapStateToProps({ posts }, ownProps) {
  return  { post: posts[ownProps.match.params.id] };//1
}
//null, since no mapStateToProps. {action creator}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
