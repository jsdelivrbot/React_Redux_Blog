import _ from 'lodash';//can check on package.json
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
//previous state, action
//default(very first time run) stae-> object
//post state is object , so need to return obj
export default function(state = {}, action){
  switch ( action.type ) {
    case DELETE_POST:
//return new state not incl specific post id
//if the state obj has the key of post id, just drip it
       //return _.reject(state, post => post.id === action.payload);
       return _.omit(state, action.payload);
    case FETCH_POST:
//no need throw away all fethed data over time,
//but add to my exising application level state rather than
//tossing away.

//taking all existing post we have.taking them all out of
//state obj, put them into the new obj we are about to return.
//And ont top of state, key(post id):value(actual post itself) pair
/** ES5
      const post = action.payload.data;
      const newState =  {...state };
      newState[post.id] =  post;
      return newState;  **/
/**  ES6  **/  //[] is key interpretation
      return { ...state, [action.payload.data.id]:action.payload.data};

    case FETCH_POSTS:
//from array(action.payload.data), pull key,"id"
//{"1":{"id":"1", "title":"Hi", "categories":"..", ..}.}
      return _.mapKeys(action.payload.data, 'id');

    default : //incl CREATE_POST.
      return state;
  }
}
