import { combineReducers } from 'redux';
import { reducer as formReducer }from 'redux-form';
import PostsReducer from './reducer_posts';
const rootReducer = combineReducers({
  posts: PostsReducer,
//redux-form is integrated inside of redux side application.
  form: formReducer
});

export default rootReducer;
