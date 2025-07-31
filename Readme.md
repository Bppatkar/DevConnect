# DevConnect: A Full-Stack Developer Showcase Platform

## Project Structure

```
DevConnect/
├── client/                     # Frontend React app
│   ├── src/
│   │   ├── components/         # UI components
│   │   │   ├── Auth.jsx        # Login & Signup combined
│   │   │   ├── ProjectCard.jsx # Project display
│   │   │   ├── ProjectForm.jsx # Add/Edit project
│   │   │   ├── Profile.jsx     # User profile
│   │   │   ├── Navbar.jsx      # Navigation
│   │   │   └── SearchBar.jsx   # Search functionality
│   │   ├── pages/              # Main pages
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Dashboard.jsx   # Main app view
│   │   │   └── ProjectView.jsx # Project details
│   │   ├── utils/
│   │   │   └── api.js          # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── project.js
│   │   └── user.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Project.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── users.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
```

## Overview

DevConnect is a full-stack web application that allows users to create profiles, showcase personal projects, and receive feedback from other users. Built as part of a senior MERN stack developer assignment, this platform demonstrates full-stack development capabilities with clean architecture and modern web technologies.

## Features

- **Persistent User Authentication:** Secure signup and login functionality with JWT-based authentication
- **User Profiles:** Create and manage personal profiles with basic information (username, email, bio)
- **Project Showcase:** Users can post their projects with titles, descriptions, and relevant links (GitHub, live demo, etc.)
- **Project Feedback:** Other users can view all projects and leave comments/feedback on them
- **Search Functionality:** Search for other users by name or projects by keywords in title/description
- **Responsive Design:** Visually clean and responsive user interface built with Tailwind CSS, adapting to various screen sizes
- **Real-time Updates:** Dynamic content updates without page refresh

## Tech Stack

This project is built using the MERN (MongoDB, Express.js, React, Node.js) stack, complemented by modern development tools and libraries.

### Frontend (Client)

- **React 19:** Latest version of React for building modern user interfaces
- **Vite:** Ultra-fast build tool and development server
- **Tailwind CSS 4:** Latest utility-first CSS framework for styling
- **Axios:** Promise-based HTTP client for API requests
- **React Router DOM:** Declarative routing for single-page applications
- **React Icons:** Popular icon library for React components

### Backend (Server)

- **Node.js:** JavaScript runtime for server-side development
- **Express.js:** Fast and minimalist web framework
- **MongoDB:** NoSQL database for flexible data storage
- **Mongoose:** ODM library for MongoDB with schema validation
- **bcrypt:** Secure password hashing
- **jsonwebtoken (JWT):** Stateless authentication tokens
- **cors:** Cross-Origin Resource Sharing middleware
- **dotenv:** Environment variable management

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

## Installation & Setup

Follow these steps to get the DevConnect application running locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Bppatkar/DevConnect.git
cd DevConnect
```

### 2. Backend Setup

Navigate into the server directory and install dependencies:

```bash
cd server
npm install
```

#### Environment Variables for Backend

Create a `.env` file in the `server` directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

**Note:** Replace `your_mongodb_connection_string_here` with your actual MongoDB connection URI. If you're using MongoDB Atlas, you can find this in your cluster's "Connect" section.

### 3. Frontend Setup

Navigate into the client directory and install dependencies:

```bash
cd ../client
npm install
```

#### Environment Variables for Frontend

Create a `.env` file in the `client` directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5173
```

## Running the Application

### 1. Start the Backend Server

From the `server` directory:

```bash
npm run dev  # For development with nodemon
# OR
npm start    # For production
```

The server will start on port 5000 (or your specified PORT). You should see messages indicating that MongoDB is connected and the server is running.

### 2. Start the Frontend Development Server

From the `client` directory:

```bash
npm run dev
```

This will start the Vite development server, usually at http://localhost:5173. The application will automatically open in your default web browser.

## API Endpoints (Backend)

Here's a summary of the key API endpoints exposed by the backend:

### Authentication

- **POST /api/auth/signup**: Register a new user.

  - Request Body: `{ username, email, password }`
  - Response: `{ token, user: { id, username, email } }`

- **POST /api/auth/login**: Authenticate a user and get a JWT.

  - Request Body: `{ email, password }`
  - Response: `{ token, user: { id, username, email } }`

- **GET /api/auth/user** (Protected): Get the currently authenticated user's details.
  - Headers: `x-auth-token: <JWT>`
  - Response: `{ id, username, email, bio, projects }`

### Users

- **GET /api/users/search?q=<keyword>**: Search for users by username.
  - Response: `[ { id, username, email, bio } ]`

### Projects

- **POST /api/projects** (Protected): Create a new project.

  - Headers: `x-auth-token: <JWT>`
  - Request Body: `{ title, description, links: [] }`
  - Response: `{ project_object }`

- **GET /api/projects**: Get all projects.

  - Response: `[ { project_object, owner: { username, email } } ]`

- **GET /api/projects/:id**: Get a single project by ID.

  - Response: `{ project_object, owner: { username, email }, comments: [ { user: { username }, text, createdAt } ] }`

- **POST /api/projects/:id/comments** (Protected): Add a comment to a project.

  - Headers: `x-auth-token: <JWT>`
  - Request Body: `{ text }`
  - Response: `[ { comment_object } ]`

- **GET /api/projects/search?q=<keyword>**: Search for projects by title or description.
  - Response: `[ { project_object, owner: { username, email } } ]`

## Frontend Routes

The client-side routing is handled by react-router-dom:

- `/`: Login/Signup Page (if not authenticated)
- `/home` (or default after login): Main application dashboard, showing projects.
- `/profile`: User's personal profile page.
- `/projects/add`: Form to add a new project.
- `/projects/:id`: Detailed view of a single project.
- `/search`: Page for searching users and projects.

## Database Schema

### User Model (models/User.js)

- `username`: String, unique, required
- `email`: String, unique, required, email format
- `password`: String, required (hashed)
- `bio`: String
- `projects`: Array of Project IDs (references Project model)
- `createdAt`: Date

### Project Model (models/Project.js)

- `title`: String, required
- `description`: String, required
- `links`: Array of Strings
- `owner`: ObjectId (references User model), required
- `comments`: Array of Objects
  - `user`: ObjectId (references User model)
  - `text`: String, required
  - `createdAt`: Date
- `createdAt`: Date

## Future Enhancements / To-Do

- **Profile Picture Upload**: Integrate multer for user profile picture uploads.
- **Project Images/Videos**: Allow uploading media for projects.
- **Password Reset**: Implement forgot password functionality.
- **Email Verification**: Add email confirmation for new signups.
- **Notifications**: Implement real-time notifications for new comments or project updates.
- **Pagination**: For large lists of projects or search results.
- **User Roles**: Differentiate between regular users and administrators.
- **Liking/Upvoting Projects**: Add social interaction features.
- **Deployment Automation**: CI/CD pipeline for automated deployments.

## Deployment Notes

This application can be deployed using various free tier services:

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Render, Heroku (free tier limitations apply), Railway

Remember to update your `VITE_API_BASE_URL` in the client's `.env` and `MONGO_URI` in the server's `.env` to point to your deployed backend and MongoDB Atlas cluster respectively.

## Live Demo

- **Frontend**: [Deployed on Netlify/Vercel] - `https://your-app-name.netlify.app`
- **Backend**: [Deployed on Render] - `https://your-api-name.onrender.com`

## Contributing

This project was created as part of a full-stack developer assignment. Feel free to fork this repository and contribute!

## Author

**Bhanu Pratap Patkar**

- GitHub: [@Bppatkar](https://github.com/Bppatkar)
- LinkedIn: [Your LinkedIn Profile]
