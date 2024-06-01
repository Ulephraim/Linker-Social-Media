/** @format */

import {
  CREATEPOST_FAILURE,
  CREATEPOST_REQUEST,
  CREATEPOST_SUCCESS,
  FOLLOWINGPOSTS_FAILURE,
  FOLLOWINGPOSTS_REQUEST,
  FOLLOWINGPOSTS_SUCCESS,
  GENERAL_FAILURE,
  GENERAL_REQUEST,
  GENERAL_SUCCESS,
  GETPOSTBYID_FAILURE,
  GETPOSTBYID_REQUEST,
  GETPOSTBYID_SUCCESS,
  GETPOST_FAILURE,
  GETPOST_REQUEST,
  GETPOST_SUCCESS,
  MYPOST_FAILURE,
  MYPOST_REQUEST,
  MYPOST_SUCCESS,
  USERPOST_FAILURE,
  USERPOST_REQUEST,
  USERPOST_SUCCESS,
} from '../constants/Post';

const initialState = {};

export const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATEPOST_REQUEST:
      return {
        loading: true,
      };
    case CREATEPOST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case CREATEPOST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETPOST_REQUEST:
      return {
        loading: true,
      };
    case GETPOST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case GETPOST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const myPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case MYPOST_REQUEST:
      return {
        loading: true,
      };
    case MYPOST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case MYPOST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const followingPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWINGPOSTS_REQUEST:
      return {
        loading: true,
      };
    case FOLLOWINGPOSTS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case FOLLOWINGPOSTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const userPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERPOST_REQUEST:
      return {
        loading: true,
      };
    case USERPOST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case USERPOST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const getPostByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETPOSTBYID_REQUEST:
      return {
        loading: true,
      };
    case GETPOSTBYID_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case GETPOSTBYID_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export const generalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_REQUEST:
      return {
        loading: true,
      };
    case GENERAL_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case GENERAL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
