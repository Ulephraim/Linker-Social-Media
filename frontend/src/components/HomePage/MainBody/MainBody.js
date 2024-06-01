/** @format */
import React from 'react';
import './MainBody.css';
import LeftSideBar from '../LeftSideBar/LeftSideBar/LeftSideBar';
import MiddleSection from '../MiddleSection/MiddleSection';
import RightSideBar from '../RightSideBar/RightSideBar';
import { Helmet } from 'react-helmet-async';

const Mainbody = () => {
  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="main-body left-sidebar">
        <LeftSideBar />
      </div>
      <div className="main-body middle-section">
        <div className="body post-section">
          <MiddleSection />
        </div>
        <div className="body right-sidebar">
          <RightSideBar />
        </div>
      </div>
    </main>
  );
};
export default Mainbody;
