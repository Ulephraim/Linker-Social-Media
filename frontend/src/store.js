/** @format */

import { configureStore } from '@reduxjs/toolkit';
import {
  allUserReducer,
  searchUserReducer,
  userProfileReducer,
  userReducer,
} from './reducers/UserReducer';
import LoadingBarReducer from './reducers/LoadingBar';
import {
  followingPostReducer,
  getPostByIdReducer,
  myPostReducer,
  postReducer,
  userPostReducer,
} from './reducers/PostReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: allUserReducer,
    userProfile: userProfileReducer,
    searchUser: searchUserReducer,
    post: postReducer,
    followingPosts: followingPostReducer,
    myposts: myPostReducer,
    userposts: userPostReducer,
    postById: getPostByIdReducer,
    loadingBar: LoadingBarReducer,
  },
});

export default store;
