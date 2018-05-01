import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=YSPA1357';//query string with ?key=
//Fetches the 40 most recent posts in the database.
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
export function createPost(values) {
  const request=axios.post(`${ROOT_URL}/posts${API_KEY}`, values);
  return {
    type: CREATE_POST,
    payload: request
  };
}
