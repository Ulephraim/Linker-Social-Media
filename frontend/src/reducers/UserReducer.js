/** @format */

import {
  LOADUSER_FAILURE,
  LOADUSER_REQUEST,
  LOADUSER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  OTP_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ALLUSER_FAILURE,
  ALLUSER_REQUEST,
  ALLUSER_SUCCESS,
  DELETE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  SEARCHUSER_FAILURE,
  SEARCHUSER_REQUEST,
  SEARCHUSER_SUCCESS,
  USERPROFILE_FAILURE,
  USERPROFILE_REQUEST,
  USERPROFILE_SUCCESS,
} from '../constants/User';

const initialState = {
  isAuthenticated: false,
  loading: false,
  isRedirect: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_REQUEST:
      return { loading: true };
    case OTP_SUCCESS:
      return { loading: false, message: action.payload, isRedirect: true };
    case OTP_FAILURE:
      return { loading: false, error: action.payload, isRedirect: false };

    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOADUSER_REQUEST:
      return {
        loading: true,
      };
    case LOADUSER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOADUSER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT_FAILURE:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: true,
      };
    case DELETE_REQUEST:
      return {
        loading: true,
        isAuthenticated: true,
      };
    case DELETE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        isAuthenticated: false,
      };

    case DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: true,
      };
    default:
      return { ...state };
  }
};

export const allUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLUSER_REQUEST:
      return {
        loading: true,
      };
    case ALLUSER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ALLUSER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export const searchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCHUSER_REQUEST:
      return {
        loading: true,
      };
    case SEARCHUSER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case SEARCHUSER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERPROFILE_REQUEST:
      return {
        loading: true,
      };
    case USERPROFILE_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USERPROFILE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const followUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_REQUEST:
      return {
        loading: true,
      };
    case FOLLOW_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case FOLLOW_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
