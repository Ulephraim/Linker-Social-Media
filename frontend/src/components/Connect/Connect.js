/** @format */

import React, { useEffect, useState } from 'react';
import './Connect.css';
import LeftSideBar from '../HomePage/LeftSideBar/LeftSideBar/LeftSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getAllUser, loadUser } from '../../actions/User';
import { setProgress } from '../../reducers/LoadingBar';
import User from '../User/User';
import { Helmet } from 'react-helmet-async';

const Connect = () => {
  const { users } = useSelector((state) => state.users);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    dispatch(setProgress(10));
    await dispatch(followUser(_id));
    dispatch(setProgress(70));
    await dispatch(loadUser());
    dispatch(setProgress(100));
  };

  useEffect(() => {
    dispatch(getAllUser({ limit: 8, page }));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMore = () => {
    setPage(page + 1);
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);
  return (
    <main>
      <Helmet>
        <title>Connect</title>
      </Helmet>

      <div className="main-box left_sidebar">
        <LeftSideBar />
      </div>
      <div className="main-box middle-section middle-section-connect">
        <div className="middle-header middle-header-media-query">
          <h2>Home</h2>
        </div>
        <div className="connect-container cnt">
          <div className="connect-header">
            <h2>Connect</h2>
            <button onClick={handleMore}>More</button>
          </div>

          {users
            ? users.map((element, index) => {
                const { name, userName, _id, avatar } = element;
                return user.userName !== userName ? (
                  <div className="suggestions" key={index}>
                    <User
                      userId={_id}
                      userName={userName}
                      name={name}
                      avatar={avatar ? avatar.url : ''}
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
                ) : (
                  ''
                );
              })
            : 'No users found'}
        </div>

        <div className="connect-btn">
          <button onClick={handlePrev} disabled={page === 1}>
            Prev
          </button>
          <button onClick={handleMore} className="more-btn">
            More
          </button>
        </div>
      </div>
    </main>
  );
};

export default Connect;
