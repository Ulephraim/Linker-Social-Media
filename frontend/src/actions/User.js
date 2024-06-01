/** @format */
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ALLUSER_FAILURE,
  ALLUSER_REQUEST,
  ALLUSER_SUCCESS,
  DELETE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  GENERAL_FAILURE,
  GENERAL_REQUEST,
  GENERAL_SUCCESS,
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
  SEARCHUSER_FAILURE,
  SEARCHUSER_REQUEST,
  SEARCHUSER_SUCCESS,
  USERPROFILE_FAILURE,
  USERPROFILE_REQUEST,
  USERPROFILE_SUCCESS,
} from '../constants/User';

export const signupUser =
  (name, userName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: OTP_REQUEST,
      });
      const { data } = await axios.post(
        'http://localhost:5000/user/register',
        {
          name,
          userName,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: OTP_SUCCESS,
        payload: data.message,
      });
      toast.success(data.messsage);
    } catch (error) {
      dispatch({
        type: OTP_FAILURE,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };
export const verifyOtp = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const { data } = await axios.post(
      'http://localhost:5000/user/verify',
      {
        otp,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const loginUser = (loginIdentifier, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const { data } = await axios.post(
      'http://localhost:5000/user/login',
      {
        loginIdentifier,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADUSER_REQUEST,
    });

    const { data } = await axios.get('http://localhost:5000/user/myProfile', {
      withCredentials: true,
    });

    dispatch({
      type: LOADUSER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOADUSER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    const { data } = await axios.get('http://localhost:5000/user/logout', {
      withCredentials: true,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getAllUser =
  ({ limit = 8, page = 1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALLUSER_REQUEST,
      });
      let { data } = await axios.get(
        `http://localhost:5000/user/all?limit=${limit}&page=${page}`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: ALLUSER_SUCCESS,
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: ALLUSER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const getUserProfile = (userName) => async (dispatch) => {
  try {
    dispatch({
      type: USERPROFILE_REQUEST,
    });
    let { data } = await axios.get(
      `http://localhost:5000/user/all?userName=${userName}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: USERPROFILE_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: USERPROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const searchUserProfile = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCHUSER_REQUEST,
    });
    let { data } = await axios.get(
      `http://localhost:5000/user/all?userName=${searchQuery}&name=${searchQuery}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: SEARCHUSER_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: SEARCHUSER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const followUser = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: FOLLOW_REQUEST,
    });
    let { data } = await axios.get(`http://localhost:5000/follow/${_id}`, {
      withCredentials: true,
    });
    dispatch({
      type: FOLLOW_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: FOLLOW_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const editUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });
    const { data } = await axios.patch(
      `http://localhost:5000/user/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: GENERAL_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: GENERAL_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const deleteAvatar = () => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });
    const { data } = await axios.get(
      `http://localhost:5000/user/deleteAvatar`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GENERAL_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: GENERAL_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REQUEST,
    });
    const { data } = await axios.delete(`http://localhost:5000/user/delete`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: DELETE_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });
    const { data } = await axios.post(
      'http://localhost:5000/user/forgotPassword',
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: GENERAL_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: GENERAL_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
export const changePassword =
  (userName, otp, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: GENERAL_REQUEST,
      });
      const { data } = await axios.post(
        'http://localhost:5000/user/changePassword',
        {
          userName,
          otp,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: GENERAL_SUCCESS,
        payload: data.message,
      });
      toast.success(data.message);
    } catch (error) {
      dispatch({
        type: GENERAL_FAILURE,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };
