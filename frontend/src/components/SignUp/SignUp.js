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
      // password does not meet criteria
      toast.error(
        'password must be at least 6 characters long and must contain at least one number and one special character.'
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
    <main className="page-wrapper">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className="brand-logo">
        <img src={brand} alt="" />
      </div>
      <div className="main-container">
        <div className="content-wrapper">
          <h1 className="linker">Sign Up to Connect</h1>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {userLoading ? <Loader /> : 'Sign Up'}
            </button>
          </form>

          <div className="login-link">
            <span>Already have an account ?</span>
            <Link className="custom-link" to="/">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignUp;
