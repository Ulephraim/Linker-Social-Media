/** @format */

import React from 'react';
import brand from '../../assets/brand-logo.png';
import './LoadLogo.css';

const LoadLogo = () => {
  return (
    <div className="load-Logo">
      <div className="LoadLogo-content">
        <img src={brand} alt="Brand Logo" className="logo" />
      </div>
    </div>
  );
};

export default LoadLogo;
