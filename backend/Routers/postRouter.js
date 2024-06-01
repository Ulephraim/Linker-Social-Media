/** @format */

import express from 'express';
import {
  bookmarks,
  comments,
  createPost,
  deleteComment,
  deletePost,
  editPost,
  getAllPost,
  getPostById,
  getPostOfFollowings,
  likes,
} from '../controllers/postController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.post('/create', isAuthenticated, singleUpload, createPost);
router.get('/all', getAllPost);
router.get('/following', isAuthenticated, getPostOfFollowings);
router
  .route('/:id')
  .get(getPostById)
  .patch(isAuthenticated, editPost)
  .delete(isAuthenticated, deletePost);

router.route('/bookmark/:id').get(isAuthenticated, bookmarks);
router.route('/likes/:id').get(isAuthenticated, likes);
router.route('/comments/:id').post(isAuthenticated, comments);

router.delete('/:postId/comments/:commentId', isAuthenticated, deleteComment);

export default router;
