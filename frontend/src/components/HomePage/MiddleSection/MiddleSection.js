/** @format */

import React, { useState } from 'react';
import './middleSection.css';
import brandImg from '../../../assets/brand-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost, getFollowingPost } from '../../../actions/Post';
import Loader from '../../Loading/Loader';
import PostBody from '../../Posts/PostBody';

const MiddleSection = () => {
  const [activeTab, setActiveTab] = useState('Explore');
  const [allPosts, setAllPosts] = useState(true);
  const [followingPosts, setFollowingPosts] = useState(false);
  const dispatch = useDispatch();
  const { post, loading: postLoading } = useSelector((state) => state.post);
  const { posts, loading: followingpostsLoading } = useSelector(
    (state) => state.followingPosts
  );

  const handleAllPosts = () => {
    setAllPosts(true);
    setFollowingPosts(false);
    dispatch(getAllPost());
  };
  const handleFollowingPosts = () => {
    setFollowingPosts(true);
    setAllPosts(false);
    dispatch(getFollowingPost());
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="middle-header">
        <div className="media-logo-container">
          <img src={brandImg} className="media-logo" alt="brand-img" />
        </div>
        <div className="mid-header-section">
          <div className="mid-hd" onClick={handleAllPosts}>
            <h3
              className={activeTab === 'Explore' ? 'active' : ''}
              onClick={() => handleTabClick('Explore')}
            >
              Explore
            </h3>
          </div>
          <div className="mid-hd" onClick={handleFollowingPosts}>
            <h3
              className={activeTab === 'Following' ? 'active' : ''}
              onClick={() => handleTabClick('Following')}
            >
              Following
            </h3>
          </div>
        </div>

        {postLoading ? (
          <Loader />
        ) : (
          allPosts && (
            <div className="middle-header-content">
              {post
                ? post
                    .slice()
                    .reverse()
                    .map((element) => {
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
          )
        )}
        {followingpostsLoading ? (
          <Loader />
        ) : (
          followingPosts && (
            <div className="middle-content">
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
                : 'No post found'}{' '}
            </div>
          )
        )}
      </div>
    </>
  );
};
export default MiddleSection;
