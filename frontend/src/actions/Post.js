/** @format */

import toast from 'react-hot-toast';
import axios from 'axios';
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

export const createPost = (myForm) => async (dispatch) => {
  try {
    dispatch({
      type: CREATEPOST_REQUEST,
    });
    const { data } = await axios.post(
      `http://localhost:5000/post/create`,
      myForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: CREATEPOST_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: CREATEPOST_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({
      type: GETPOST_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/post/all`, {
      withCredentials: true,
    });

    dispatch({
      type: GETPOST_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: GETPOST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: FOLLOWINGPOSTS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/post/following`, {
      withCredentials: true,
    });
    dispatch({
      type: FOLLOWINGPOSTS_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: FOLLOWINGPOSTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getMyPost = () => async (dispatch) => {
  try {
    dispatch({
      type: MYPOST_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/user/me/posts`, {
      withCredentials: true,
    });

    dispatch({
      type: MYPOST_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: MYPOST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getMyBookmark = () => async (dispatch) => {
  try {
    dispatch({
      type: MYPOST_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/user/me/bookmarks`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: MYPOST_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: MYPOST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getUserPost = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USERPOST_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/user/posts/${userId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: USERPOST_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: USERPOST_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getPostById = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: GETPOSTBYID_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/post/${postId}`, {
      withCredentials: true,
    });

    dispatch({
      type: GETPOSTBYID_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: GETPOSTBYID_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/post/likes/${postId}`,
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
  }
};

export const commentPost =
  ({ postId, comment }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GENERAL_REQUEST,
      });

      const { data } = await axios.post(
        `http://localhost:5000/post/comments/${postId}`,
        {
          comment,
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
    }
  };

export const bookmarkPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/post/bookmark/${postId}`,
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
  }
};

export const editPost =
  ({ postId, caption }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GENERAL_REQUEST,
      });

      const { data } = await axios.patch(
        `http://localhost:5000/post/${postId}`,
        {
          caption,
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
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL_REQUEST,
    });

    const { data } = await axios.delete(
      `http://localhost:5000/post/${postId}`,
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
  }
};
