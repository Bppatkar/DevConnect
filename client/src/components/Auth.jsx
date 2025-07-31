import React, { useState } from 'react';
import { authApi } from '../utils/api'; 

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authApi.signup(formData);
      }

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user); // Pass user data up to App.jsx
      } else {
        // Handle non-2xx responses
        setError(response.data.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      // Handle network errors or errors from Axios
      const errorMessage = err.response?.data?.message || 'Network error. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8 max-w-md mx-auto bg-background-light">
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-t-lg font-semibold text-lg transition-colors duration-200 ${
            isLogin
              ? 'bg-primary text-white shadow-md'
              : 'bg-secondary text-text-white hover:bg-dark-secondary'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-6 py-3 rounded-t-lg font-semibold text-lg transition-colors duration-200 ${
            !isLogin
              ? 'bg-primary text-white shadow-md'
              : 'bg-secondary text-text-white hover:bg-dark-secondary'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          {isLogin ? 'Welcome Back' : 'Join DevConnect'}
        </h2>
        <p className="text-text-secondary mt-2">
          {isLogin
            ? 'Sign in to your account'
            : 'Create your developer profile'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <div className="text-danger text-sm text-center bg-danger/10 p-3 rounded-lg border border-danger">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:text-primary-dark text-sm"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
