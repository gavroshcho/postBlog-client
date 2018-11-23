import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import auth from 'reducers/auth';
import user from 'reducers/user';
import PostsReducer from 'reducers/posts';

export default combineReducers({
  auth,
  user,
  posts: PostsReducer,
  form: formReducer
});