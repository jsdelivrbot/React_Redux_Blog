import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=YSPA1357';//query string with ?key=

/* /api/posts	GET	http://reduxblog.herokuapp.com/api/posts
Fetches the 40 most recent posts in the database.*/
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}
//values consists of title, categories, content
//Creates a new blog post entry.
//Returns the created blog post with the ID
//but following values have no "id" associated it.So
//we can't put values into state array directly.
/* /api/posts	POST	http://reduxblog.herokuapp.com/api/posts
Creates a new blog post. Returns the created post w/ ID */
export function createPost(values, callback) {
//callback is ()=> {this.props.history.push('/')}
//of this.props.createPost func in posts_new7.js
  const request=axios
   .post(`${ROOT_URL}/posts${API_KEY}`, values)
   .then(() => callback());
//after post created, then root index page shown
  return {
    type: CREATE_POST,
    payload: request
  };
}

/* /api/posts/:id	GET http://reduxblog.herokuapp.com/api/posts/5
fetch single post w/ given ID, incl blogs's content*/
export function fetchPost(id) {
  const request=axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}
/* /api/posts/:id DELETE http://reduxblog.herokuapp.com/api/posts/5
 Deletes a single blog post with the given ID. Returns the post*/
export function deletePost(id, callback) {
//callback is ()=> {this.props.history.push('/')}
//of this.props.createPost func in posts_new7.js
  const request=axios
    .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  };
}
