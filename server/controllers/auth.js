import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next({
        message: 'Please provide username, email and password',
        statusCode: 400,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return next({
        message:
          existingUser.email === email
            ? 'Email already registered'
            : 'Username already taken',
        statusCode: 400,
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: 'Please provide email and password',
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next({ message: 'Invalid email or password', statusCode: 400 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next({ message: 'Invalid email or password', statusCode: 400 });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('projects');

    res.json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};
