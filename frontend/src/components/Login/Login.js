/** @format */
import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import brand from '../../assets/brand-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, loginUser } from '../../actions/User';
import LoadLogo from '../Loading/LoadLogo';
import Loader from '../Loading/Loader';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { loading: userLoading } = useSelector((state) => state.user);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginIdentifier, password));
      dispatch(loadUser());
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      {userLoading ? (
        <LoadLogo />
      ) : (
        <div className="login-page">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="login-box">
            <div className="login-box-logo">
              <img src={brand} alt="Brand Logo" />
            </div>
            <h2>Welcome</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Email Address or Username"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="options-container">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-btn">
                {userLoading ? <Loader /> : 'Login'}
              </button>

              <p className="signup-text">
                Don't have an account?{' '}
                <Link to="/signup" className="signup-link">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
