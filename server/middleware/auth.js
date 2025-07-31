import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      // Use next(error) to pass to the global errorHandler
      return next({
        message: 'No token provided, authorization denied',
        statusCode: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next({
        message: 'User not found, authorization denied',
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      next(error);
    } else {
      console.error('Auth middleware error:', error.message);
      next({ message: 'Server error during authentication', statusCode: 500 });
    }
  }
};
