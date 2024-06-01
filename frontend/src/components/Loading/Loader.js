/** @format */

import React from 'react';
import loadSpinner from '../../assets/load-spinner.gif';
import './LoadLogo.css';

const Loader = () => {
  return (
    <>
      <div className="loading-spinner">
        <img src={loadSpinner} alt="loadSpinner" />
      </div>
    </>
  );
};
export default Loader;
