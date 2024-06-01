/** @format */

import React, { useState } from 'react';
import './AddDetails.css';
// import userImg from '../../assets/userdark.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../actions/User';
import { Helmet } from 'react-helmet-async';

const AddDetails = () => {
  const { user } = useSelector((state) => state.user);
  const [about, setAbout] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('about', about);
    formData.append('dob', dob);
    formData.append('location', location);
    formData.append('link', link);
    formData.append('file', image);
    await dispatch(editUser(formData));
    navigate('/');
  };
  return (
    <main className="login-page">
      <Helmet>
        <title>Add Details</title>
      </Helmet>
      <div className="login-form details-form">
        <form onSubmit={updateUser}>
          <div className="popup-head">
            <h2>Add Details</h2>
          </div>
          <div className="information">
            <div className="image-profile">
              <img
                className="user-img"
                src={imagePreview ? imagePreview : user?.avatar?.url}
                alt=""
              />
              <div>
                <label className="file-input">
                  <span className="active-btn">Choose photo</span>
                  <input type="file" onChange={imageHandler} />
                </label>
                <span
                  className="notactive-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setImagePreview(null);
                  }}
                >
                  Remove photo
                </span>
              </div>
            </div>
            <input
              type="text"
              placeholder="Bio"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <input
              type="date"
              placeholder="DOB"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <div className="down-btn-container">
              <button className="down-btn" type="submit">
                Add
              </button>
              <Link className="down-btn-link" to="/">
                <p>Skip For Now</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
export default AddDetails;
