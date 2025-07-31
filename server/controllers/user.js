import User from '../models/User.js';
import Project from '../models/Project.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('projects');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('projects');
    if (!user) {
      return next({ message: 'User not found', statusCode: 404 });
    }
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, bio } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return next({ message: 'User not found', statusCode: 404 });
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return next({ message: 'Username already taken', statusCode: 400 });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return next({ message: 'Email already in use', statusCode: 400 });
      }
      user.email = email;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return next({ message: 'Search query (q) is required', statusCode: 400 });
    }

    const searchRegex = new RegExp(q, 'i');

    const users = await User.find({
      $or: [
        { username: { $regex: searchRegex } },
        { email: { $regex: searchRegex } }
      ]
    })
      .select('-password')
      .limit(10);

    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await Project.deleteMany({ owner: userId });

    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: 'Account and associated projects deleted successfully' });
  } catch (error) {
    next(error);
  }
};

