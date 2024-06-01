/** @format */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, loadUser } from './actions/User';
import { getAllPost, getFollowingPost, getMyPost } from './actions/Post';
import LoadingBar from 'react-top-loading-bar';
import Mainbody from './components/HomePage/MainBody/MainBody';
import Login from './components/Login/Login';
import Connect from './components/Connect/Connect';
import PostSection from './components/ProfilePage/PostSection';
import Users from './components/UserProfile/UserProfile';
import Comment from './components/Comment/Comment';
import SignUp from './components/SignUp/SignUp';
// import Verification from './components/OTP/Verification';
import AddDetails from './components/Add Details/AddDetails';
import ForgotPassword from './components/Change Password/ForgotPassword';
import ChangePassword from './components/Change Password/ChangePassword';

function App() {
  const { isAuthenticated, isRedirect } = useSelector((state) => state.user);
  const loadingProgress = useSelector((state) => state.loadingBar.progress);

  const [progress, setLocalProgress] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllUser({}));
    dispatch(getAllPost());
    dispatch(getMyPost());
    dispatch(getFollowingPost());

    if (progress !== loadingProgress) {
      setLocalProgress(loadingProgress);
    }
  }, [dispatch, loadingProgress]);

  useEffect(() => {}, []);

  return (
    <Router>
      <LoadingBar
        color="orangered"
        progress={progress}
        onLoaderFinished={() => setLocalProgress(0)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Mainbody /> : <Login />}
        />
        <Route
          exact
          path="/connect"
          element={isAuthenticated ? <Connect /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={isAuthenticated ? <PostSection /> : <Login />}
        />
        <Route
          exact
          path="/user/:userName"
          element={isAuthenticated ? <Users /> : <Login />}
        />
        <Route
          exact
          path="/post/:id"
          element={isAuthenticated ? <Comment /> : <Login />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route
          exact
          path="/verify"
          element={isRedirect ? <Verification /> : <SignUp />}
        /> */}
        <Route
          exact
          path="/details"
          // element={isAuthenticated ? <AddDetails/> : <Verification />}
          element={<AddDetails />}
        />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/changePassword" element={<ChangePassword />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              backgroundColor: '#ffe0b2',
              color: '#202124',
              border: '1px solid #ffb74d',
              borderRadius: '8px',
              padding: '16px',
              marginRight: '20px',
              // height: '20px',
              height: 'fit-content',
              maxWidth: '400px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
            iconTheme: {
              primary: '#34A853',
              secondary: 'white',
            },
          },
          error: {
            style: {
              backgroundColor: '#ffcdd2',
              color: '#202124',
              border: '1px solid #ef9a9a',
              borderRadius: '8px',
              padding: '16px',
              marginRight: '20px',
              maxWidth: '400px',
              height: 'fit-content',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
            iconTheme: {
              primary: '#EA4335',
              secondary: 'white',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
