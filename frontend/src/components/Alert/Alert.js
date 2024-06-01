/** @format */

import React from 'react';
import './Alert.css';

const Alert = ({ photo, description, action, actionFunction, closePopup }) => {
  return (
    <div className="pop-up">
      <div className="alert-popup visible">
        <div className="alert-popup-content">
          <div className="alert-popup-head">
            <img src={photo} alt="Alert" />
          </div>
          <div className="alert-popup-body">
            <h4>{description}</h4>
            <div className="alert-popup-buttons">
              <button className="alert-logout-btn" onClick={actionFunction}>
                {action}
              </button>
              <button className="alert-close-btn" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
