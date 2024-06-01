/** @format */

import express from 'express';

import {
  changePassword,
  deleteAvatar,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyBookmarks,
  getMyPosts,
  getMyProfile,
  getUserPosts,
  getUserbyID,
  login,
  logout,
  register,
  updateUser,
} from '../controllers/userController.js';
import singleUpload from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', singleUpload, register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('changePassword', changePassword);
router.get('/myProfile', isAuthenticated, getMyProfile);
router.get('/logout', logout);
router.patch('/update', isAuthenticated, singleUpload, updateUser);
router.delete('/delete', isAuthenticated, deleteUser);
router.get('/all', getAllUsers);
router.post('/:id', getUserbyID);
router.route('/me/posts').get(isAuthenticated, getMyPosts);
router.route('/me/bookmarks').get(isAuthenticated, getMyBookmarks);
router.route('/posts/:id').get(isAuthenticated, getUserPosts);
router.get('/deleteAvatar', isAuthenticated, deleteAvatar);

export default router;
