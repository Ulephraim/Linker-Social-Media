/** @format */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../assets/brand-logo.png';
import '../SignUp/SignUp.css';
import toast from 'react-hot-toast';
import { changePassword } from '../../actions/User';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

const ChangePassword = () => {
  const [userName, setUserName] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      newPassword.length < 6 ||
      !/\d/.test(newPassword) ||
      !/[!@#$%^&*]/.test(newPassword)
    ) {
      // New password doesn't meet the criteria
      toast.error(
        'New password must be at least 6 characters long and must contain at least one number and one special character.'
      );
    } else {
      await dispatch(changePassword(userName, otp, newPassword));
      navigate('/');
    }
  };

  return (
    <main className="page-wrapper">
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className="brand-logo">
        <img src={brand} alt="" />
      </div>
      <div className="main-container">
        <div className="content-wrapper">
          <h1 className="linker">Change Password</h1>
          <form
            style={{ borderBottom: '1px solid #c2c8d0' }}
            onSubmit={handleChangePassword}
          >
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter the verification otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="check-box">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label>Show</label>
            </div>
            <button type="submit" className="form-btn">
              Confirm
            </button>
          </form>
          <span className="btn-span">or</span>
          <Link className="custom-link" to="/">
            <p>Go Back</p>
          </Link>
        </div>
      </div>
    </main>
  );
};
export default ChangePassword;
