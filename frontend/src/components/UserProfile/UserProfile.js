/** @format */

import React, { useState } from 'react';
import './UserProfile.css';
import User from '../User/User';
import RightSideBar from '../HomePage/RightSideBar/RightSideBar';
import PostBody from '../Posts/PostBody';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress } from '../../reducers/LoadingBar';
import { followUser, loadUser } from '../../actions/User';
import LeftSideBar from '../HomePage/LeftSideBar/LeftSideBar/LeftSideBar';
import Loader from '../Loading/Loader';
import post from '../../assets/post-dark.png';
import linkIcon from '../../assets/link.png';
import locationIcon from '../../assets/location-dark.png';
import dateIcon from '../../assets/date-dark.png';
import bioIcon from '../../assets/bio-dark.png';
import { Helmet } from 'react-helmet-async';

const Users = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { users, loading: ProfileLoading } = useSelector(
    (state) => state.userProfile
  );
  const { posts, loading: postsLoading } = useSelector(
    (state) => state.userposts
  );
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);

  const dispatch = useDispatch();

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closePopup = () => {
    setFollowingOpen(false);
    setFollowersOpen(false);
  };

  const handleFollow = async (_id) => {
    dispatch(setProgress(10));
    await dispatch(followUser(_id));
    await dispatch(loadUser());
    dispatch(setProgress(100));
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);

  return (
    <>
      <main>
        <div className="main-box left_sidebar">
          <LeftSideBar />
        </div>
        {ProfileLoading && postsLoading ? (
          <Loader />
        ) : (
          <div className="main-box middle-section">
            <div className="user-details">
              <div className="user_section profile_details">
                {users ? (
                  users.map((element, index) => {
                    const {
                      userName,
                      name,
                      followers,
                      following,
                      posts,
                      description,
                      avatar,
                      _id,
                    } = element;
                    return (
                      <>
                        <Helmet>
                          <title>User Profile</title>
                        </Helmet>
                        <div className="user-profile-header">
                          <div className="profile-header-user">
                            <span>{userName}</span>
                          </div>
                          <div className="profile-header-pst">
                            <p>{posts.length} Posts</p>
                          </div>
                        </div>

                        <div className="profile_box profile_photo">
                          <div className="image-profile">
                            <img src={avatar?.url} alt="no img" />
                          </div>
                        </div>

                        <div
                          className="profile_box profile_content"
                          key={index}
                        >
                          <div className="content_box user_name">
                            <span>{userName}</span>
                            {user.userName === userName ? (
                              <Link to="/profile">
                                <button>Edit Profile</button>{' '}
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleFollow(_id)}
                                className="userprofile-btn"
                              >
                                {isAuthenticated && isUserFollowed(_id) ? (
                                  <span className="unfollow">Following</span>
                                ) : (
                                  <span>Follow</span>
                                )}
                              </button>
                            )}
                          </div>
                          <div className="content_box followers_details_section">
                            <div onClick={openFollowersPopup}>
                              <p>{followers.length} Followers</p>
                            </div>
                            <div onClick={openFollowingPopup}>
                              <p>{following.length} Following</p>
                            </div>
                          </div>
                          <div className="content_box user_descripton">
                            <h4>{name}</h4>
                            {users && description ? (
                              <>
                                {description.about ? (
                                  <p>
                                    <img src={bioIcon} alt="" />
                                    {description.about}
                                  </p>
                                ) : (
                                  ''
                                )}
                                {description.dob ? (
                                  <p>
                                    <img src={dateIcon} alt="" />
                                    {description.dob}
                                  </p>
                                ) : (
                                  ''
                                )}
                                {description.location ? (
                                  <p>
                                    <img src={locationIcon} alt="" />
                                    {description.location}
                                  </p>
                                ) : (
                                  ''
                                )}
                                {description.link ? (
                                  <p>
                                    <img src={linkIcon} alt="" />
                                    <a
                                      href={`${description.link}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {description.link}
                                    </a>
                                  </p>
                                ) : (
                                  ''
                                )}
                              </>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <h2>Not found</h2>
                )}
              </div>
              <div className="user_section post_details">
                <div className="post_details_header">
                  <div className="posts detail_box active_class">
                    <img src={post} alt="" />
                    <span>Posts</span>
                  </div>
                </div>
                <div className="post_detail_content">
                  {posts
                    ? posts.map((element) => {
                        const {
                          caption,
                          _id,
                          likes,
                          owner,
                          comments,
                          image,
                          createdAt,
                        } = element;
                        return (
                          <PostBody
                            key={_id}
                            caption={caption}
                            postId={_id}
                            likes={likes}
                            owner={owner}
                            comments={comments}
                            image={image?.url}
                            createdAt={createdAt}
                          />
                        );
                      })
                    : 'No post found'}
                </div>
              </div>
            </div>

            <div className="box right_sidebar">
              <RightSideBar />
            </div>
          </div>
        )}

        {users
          ? users.map((element) => {
              const { followers, following } = element;
              return (
                <>
                  {isFollowersOpen && (
                    <div className="pop-up">
                      <div className="popup">
                        <div className="popup-content follow">
                          <div
                            className="popup-head-content"
                            style={{ marginBottom: '10px' }}
                          >
                            <h2>Followers</h2>{' '}
                            <span className="close-icon" onClick={closePopup}>
                              &times;
                            </span>
                          </div>

                          {followers.length !== 0
                            ? followers.map((element) => {
                                const { _id, userName, name, avatar } = element;
                                return (
                                  <User
                                    key={_id}
                                    userId={_id}
                                    userName={userName}
                                    name={name}
                                    avatar={avatar?.url}
                                  />
                                );
                              })
                            : 'Not followed anyone'}
                        </div>
                      </div>
                    </div>
                  )}

                  {isFollowingOpen && (
                    <div className="pop-up">
                      <div className="popup">
                        <div className="popup-content follow">
                          <div
                            className="popup-head-content"
                            style={{ marginBottom: '10px' }}
                          >
                            <h2>Following</h2>{' '}
                            <span className="close-icon" onClick={closePopup}>
                              &times;
                            </span>
                          </div>

                          {following.length !== 0
                            ? following.map((element) => {
                                const { _id, userName, name, avatar } = element;
                                return (
                                  <User
                                    key={_id}
                                    userId={_id}
                                    userName={userName}
                                    name={name}
                                    avatar={avatar?.url}
                                  />
                                );
                              })
                            : 'Not followed anyone'}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          : 'Not Found'}
      </main>
    </>
  );
};

export default Users;
