/** @format */

import React, { useState } from 'react';
import './RightSideBar.css';
import { Link } from 'react-router-dom';
import closeSearch from '../../../assets/close-search.png';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress } from '../../../reducers/LoadingBar';
import { followUser, loadUser, searchUserProfile } from '../../../actions/User';
import User from '../../User/User';

const RightSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    loading: userLoading,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');

  const { users } = useSelector((state) => state.users);
  const { users: allUsers } = useSelector((state) => state.searchUser);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    dispatch(setProgress(10));
    await dispatch(followUser(_id));
    dispatch(setProgress(70));
    await dispatch(loadUser());
    dispatch(setProgress(100));
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSearch = () => {
    dispatch(searchUserProfile(searchQuery));
  };

  return (
    <div className="sidebarColumn">
      <div className="right-main">
        <div className={`search-drawer ${isOpen ? 'open' : ''}`}>
          <div className="input-section-box">
            <div className="input-section">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();
                  setIsOpen(true);
                }}
              />
              <button>
                <img
                  src={closeSearch}
                  alt=""
                  className="close-button"
                  onClick={onClose}
                />
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="searched-user">
              {allUsers
                ? allUsers.map((element, index) => {
                    const { name, userName, _id, avatar } = element;
                    return (
                      <div className="suggestions" key={index}>
                        <User
                          userId={_id}
                          userName={userName}
                          name={name}
                          avatar={avatar?.url}
                        />
                      </div>
                    );
                  })
                : 'No users found'}
            </div>
          )}
        </div>
        <Link to="/profile" className="right-main-custom-link">
          <div className="rightSidebar-header">
            <div className="userImg">
              <img src={user && user.avatar?.url} alt="" />
            </div>
            {user ? (
              <div className="userDetail">
                <div className="username">
                  <p>{user.userName}</p>
                </div>
                <div className="name">
                  <p>{user.name}</p>
                </div>
              </div>
            ) : (
              <p>Login first</p>
            )}
            <div className="view-btn">
              <button>View</button>
            </div>
          </div>
        </Link>

        <div className="righSidebar-content">
          <div className="content-heading">
            <p>Suggested for you</p>
            <Link to="/connect" className="connect-custom-link">
              <p>See all</p>
            </Link>
          </div>
          <div className="content-body">
            {users
              ? users.map((element, index) => {
                  const { name, userName, _id, avatar } = element;
                  return userName && user && user.userName !== userName ? (
                    <div className="suggestions" key={index}>
                      <User
                        userId={_id}
                        userName={userName}
                        name={name}
                        avatar={avatar?.url}
                      />
                      <div className="btn">
                        <button onClick={() => handleFollow(_id)}>
                          {isAuthenticated && isUserFollowed(_id) ? (
                            <span className="unfollow2">Following</span>
                          ) : (
                            <span className="follow2">Follow</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : null;
                })
              : 'No users found'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
