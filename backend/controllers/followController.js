/** @format */

import { User } from '../models/userModel.js';

export const follow = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const user = await User.findById(req.user._id);

    if (userToFollow._id.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Bad request',
      });
    }
    const isFollowing = user.following.includes(userToFollow._id);

    if (isFollowing) {
      user.following = user.following.filter(
        (followedUser) =>
          followedUser.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (followingUser) => followingUser.toString() !== user._id.toString()
      );
    } else {
      user.following.push(userToFollow._id);
      userToFollow.followers.push(user._id);
    }

    await user.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: isFollowing
        ? 'Unfollowed successfully'
        : 'Followed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
