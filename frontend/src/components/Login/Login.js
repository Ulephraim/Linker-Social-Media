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
    await dispatch(loginUser(loginIdentifier, password));
    dispatch(loadUser());
  };
  return (
    <>
      {userLoading ? (
        <LoadLogo />
      ) : (
        <main className="page-wrapper">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="brand-logo">
            <img src={brand} alt="" />
          </div>
          <div className="main-container">
            <div className="content-wrapper">
              <h1 className="linker">Log In to Linker</h1>
              <form className="login-form" onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Enter Email or Username"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
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
                  {userLoading ? <Loader /> : 'Login'}
                </button>
              </form>
              <span className="btn-span">or</span>
              <Link className="custom-link" to="/forgotPassword">
                <p>Forgotten Your Password</p>
              </Link>

              <button type="signup" className="signup-link">
                <Link to="/signup">
                  <span>Don't have an account ? SignUp</span>
                </Link>
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
export default Login;
