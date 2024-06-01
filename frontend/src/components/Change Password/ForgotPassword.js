/** @format */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../assets/brand-logo.png';
import '../SignUp/SignUp.css';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/User';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    navigate('/changePassword');
  };

  return (
    <main className="page-wrapper" style={{ marginTop: '50px' }}>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="brand-logo">
        <img src={brand} alt="" style={{ paddingTop: '90px' }} />
      </div>
      <div className="main-container" style={{ marginBottom: '50px' }}>
        <div className="content-wrapper" style={{ marginBottom: '50px' }}>
          <h1 className="linker">Forgot Password</h1>
          <form
            style={{ borderBottom: '1px solid #c2c8d0' }}
            onSubmit={handleForgotPassword}
          >
            <input
              type="text"
              placeholder="Enter the registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="form-btn">
              Verify Email
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
export default ForgotPassword;
