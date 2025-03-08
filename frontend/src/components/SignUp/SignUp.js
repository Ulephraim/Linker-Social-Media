/** @format */

import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../assets/brand-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { signupUser } from '../../actions/User';
import Loader from '../Loading/Loader';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: userLoading } = useSelector((state) => state.user);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      toast.error(
        'Password must be at least 6 characters long and contain at least one number and one special character.'
      );
    } else {
      await dispatch(signupUser(name, userName, email, password));
      setName(name);
      setEmail(email);
      setUserName(userName);
      navigate('/details');
    }
  };

  return (
    <div className="signup-wrapper">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="signup-card">
        <div className="signup-logo-section">
          <img src={brand} alt="Brand Logo" className="signup-brand-logo" />
        </div>
        <h2 className="signup-heading">Create Your Account</h2>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="signup-input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-name-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="signup-username-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-email-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-password-input"
              required
            />
          </div>

          <div className="signup-options">
            <div className="signup-checkbox-group">
              <input
                type="checkbox"
                id="signup-show-password"
                onChange={() => setShowPassword(!showPassword)}
                className="signup-checkbox"
              />
              <label
                htmlFor="signup-show-password"
                className="signup-checkbox-label"
              >
                Show Password
              </label>
            </div>
          </div>

          <button type="submit" className="signup-submit-btn">
            {userLoading ? <Loader /> : 'Sign Up'}
          </button>

          <p className="signup-login-text">
            Already have an account?{' '}
            <Link to="/" className="signup-login-link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
