import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

//importing routes
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import projectRoutes from './routes/projects.js';
// import commentRoutes from './routes/comments.js';

const app = express();

connectDB();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/comments', commentRoutes);

//Health Check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: '🚀 DevConnect API Health Check... Working',
    status: 'success',
    timestamp: new Date().toISOString,
  });
});

// error handling middleware
app.use(errorHandler);



// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health Check Router: http://localhost:${PORT}/api/health`);
});
