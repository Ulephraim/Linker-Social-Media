/** @format */
import express from 'express';
import { follow } from '../controllers/followController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();
router.route('/:id').get(isAuthenticated, follow);

export default router;
