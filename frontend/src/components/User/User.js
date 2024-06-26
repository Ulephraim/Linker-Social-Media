/** @format */

import React from 'react';
import './User.css';
import user2Img from '../../assets/userdark.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../actions/User';
import { getUserPost } from '../../actions/Post';

const User = ({ userName, name, userId, avatar }) => {
  const dispatch = useDispatch();
  const handleGetUserProfile = () => {
    dispatch(getUserProfile(userName));
  };
  const handleGetUserPost = () => {
    dispatch(getUserPost(userId));
  };

  return (
    <Link to={`/user/${userName}`}>
      <div
        className="user"
        onClick={() => {
          handleGetUserProfile();
          handleGetUserPost();
        }}
      >
        <div className="userImg">
          <img src={avatar ? avatar : user2Img} alt="" />
        </div>

        <div className="userDetail">
          <div className="username">
            <p>{name}</p>
          </div>
          <div className="name">
            <p>@{userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default User;
