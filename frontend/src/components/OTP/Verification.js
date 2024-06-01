/** @format */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brand from '../../assets/brand-logo.png';
import '../SignUp/SignUp.css';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loading/Loader';
import { verifyOtp } from '../../actions/User';
import { Helmet } from 'react-helmet-async';

const Verification = () => {
  const { loading: userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const handleVerify = async (e) => {
    e.preventDefault();
    await dispatch(verifyOtp(otp));
    navigate('/details');
  };

  return (
    <main className="login-page" style={{ marginTop: '80px' }}>
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <div className="brand-logo">
        <img src={brand} alt="" />
      </div>
      <div className="main-container">
        <div className="content-wrapper">
          <h1 className="linker">Verify OTP to Register</h1>
          <form
            style={{ borderBottom: '1px solid #c2c8d0' }}
            onSubmit={handleVerify}
          >
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="form-btn">
              {userLoading ? <Loader /> : 'Confirm and Signup'}
            </button>
            <Link className="custom-link" to="/signup">
              <p>Go Back</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Verification;
