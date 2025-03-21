/** @format */

import React, { useState } from 'react';
import './LeftSideBar.css';
import { Link } from 'react-router-dom';
import brandImg from '../../../../assets/brand-logo.png';
import {
  Home,
  Bell,
  Users,
  User,
  Home as HomeSolid,
  Bell as BellSolid,
  Users as UsersSolid,
  User as UserSolid,
  Pencil,
  Settings,
  PlusIcon,
} from 'lucide-react';
import logout from '../../../../assets/logout-dark.png';
import passwordIcon from '../../../../assets/change-password.png';
import warninglogo from '../../../../assets/warning-red.png';
import deleteIcon from '../../../../assets/delete-dark.png';
import create from '../../../../assets/create-dark.png';
import options from '../../../../assets/options-dark.png';
import imageicon from '../../../../assets/image-dark.png';
import { useDispatch, useSelector } from 'react-redux';
import { setProgress } from '../../../../reducers/LoadingBar';
import {
  createPost,
  deletePost,
  getAllPost,
  getMyPost,
} from '../../../../actions/Post';
import { getAllUser, logoutUser } from '../../../../actions/User';
import Alert from '../../../Alert/Alert';
import '../../../Alert/Alert.css';

const LeftSideBar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('caption', caption);
    myForm.append('file', image);

    dispatch(setProgress(10));
    await dispatch(createPost(myForm));
    dispatch(setProgress(60));
    await dispatch(getAllPost());
    dispatch(getMyPost());
    closePopup();
    dispatch(setProgress(100));
  };

  const handleLogout = () => {
    dispatch(setProgress(10));
    dispatch(logoutUser());
    dispatch(setProgress(60));
    setIsLogoutOpen(false);
    dispatch(setProgress(100));
  };

  const handleLogoutPopup = () => {
    setIsLogoutOpen(true);
  };
  const handleDelete = () => {
    dispatch(setProgress(10));
    dispatch(deletePost());
    dispatch(setProgress(60));
    setIsDeleteOpen(false);
    dispatch(setProgress(100));
  };
  const handleDeletePopup = () => {
    setIsDeleteOpen(true);
  };
  const handleOptionClick = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleConnect = () => {
    dispatch(setProgress(50));
    dispatch(getAllUser({}));
    dispatch(setProgress(100));
  };

  const handleAllPosts = () => {
    dispatch(getAllPost());
  };

  const handleMyPosts = () => {
    dispatch(getMyPost());
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setCaption('');
    setImagePreview(null);
    setIsLogoutOpen(false);
    setIsDeleteOpen(false);
  };

  const toogleOptionPopup = () => {
    setIsOptionOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="leftSidebar-header">
        <h1 className="Linker Linker-leftSideBar">Linker</h1>
        <img
          src={brandImg}
          className="brandLogo-leftSidebar"
          alt="brand-logo"
        />
      </div>

      <div className="leftSidebar-content">
        <div className="leftSidebar-Upcontent">
          <Link
            className={`left-boxes ${
              selectedOption === 'home' ? 'active' : ''
            }`}
            onClick={() => {
              handleOptionClick('home');
              handleAllPosts();
            }}
            to="/"
          >
            {selectedOption === 'home' ? (
              <HomeSolid fill="currentColor" /> // Simulating solid effect
            ) : (
              <Home />
            )}
            <p>Home</p>
          </Link>

          <div
            className={`left-boxes ${
              selectedOption === 'notification' ? 'active' : ''
            }`}
            onClick={() => {
              handleOptionClick('notification');
            }}
          >
            {selectedOption === 'notification' ? (
              <BellSolid fill="currentColor" />
            ) : (
              <Bell />
            )}

            <p>Notification</p>
          </div>

          <Link
            className={`left-boxes ${
              selectedOption === 'connect' ? 'active' : ''
            }`}
            onClick={() => {
              handleOptionClick('connect');
              handleConnect();
            }}
            to="/connect"
          >
            {selectedOption === 'connect' ? (
              <UsersSolid fill="currentColor" />
            ) : (
              <Users />
            )}

            <p>Connect</p>
          </Link>

          <Link
            className={`left-boxes ${
              selectedOption === 'profile' ? 'active' : ''
            }`}
            onClick={handleMyPosts}
            to="/profile"
          >
            {selectedOption === 'profile' ? (
              <UserSolid fill="currentColor" />
            ) : (
              <User />
            )}
            <p>Profile</p>
          </Link>

          <div className="left-boxes create-post" onClick={openPopup}>
            <PlusIcon className="plus-icon" />
            <p>Create Post</p>
          </div>
        </div>

        <div className="leftSideBar-Downcontent">
          <div className="left-boxes" onClick={toogleOptionPopup}>
            <Settings />
            <p>More</p>
          </div>

          {isLogoutOpen && (
            <Alert
              photo={warninglogo}
              description={'Are you sure you want to logout?'}
              action={'Logout'}
              actionFunction={handleLogout}
              closePopup={closePopup}
            />
          )}

          {isDeleteOpen && (
            <Alert
              photo={warninglogo}
              description={'Are you sure you want to Delete Account?'}
              action={'Delete'}
              actionFunction={handleDelete}
              closePopup={closePopup}
            />
          )}

          {isOptionOpen && (
            <div className="options-box">
              <div onClick={handleLogoutPopup} className="options-left-boxes">
                <img src={logout} alt="" />
                <p>Logout</p>
              </div>
              <Link to="/changePassword">
                <div className="options-left-boxes">
                  <img src={passwordIcon} alt="" />
                  <p>Change Password</p>
                </div>
              </Link>
              <div onClick={handleDeletePopup} className="options-left-boxes">
                <img src={deleteIcon} alt="" />
                <p>Delete Account</p>
              </div>
              <div className="box"></div>
            </div>
          )}
          <div className="left-footer">
            <p>Linker@2024</p>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="pop-up">
          <div className={`popup ${isPopupOpen ? 'visible' : ''}`}>
            <div className="popup-header">
              <div className="popup-head-left">
                <img src={user.avatar?.url} alt="" />
                <h2>Post</h2>
              </div>
              <button className="close-icon" onClick={closePopup}>
                &times;
              </button>
            </div>

            <form className="popup-form" onSubmit={handleCreatePost}>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                rows="4"
              ></textarea>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={imageHandler}
              />
              <div className="popup-foot">
                <label htmlFor="file-input" className="custom-file-input-label">
                  <img src={imageicon} alt="Upload" />
                </label>
                <button type="submit">Post</button>
              </div>
              <div className="preview-img">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSideBar;
