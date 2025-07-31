import React, { useState } from "react";
import { authApi } from "../utils/api";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        localStorage.setItem("token", response.data.token);
        onLogin(response.data.user);
      } else {
        setError(
          response.data.message || "Authentication failed. Please try again.",
        );
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Network error. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm border border-gray-700"> {/* Adjusted transparency, added blur and border */}
      {/* Toggle Buttons */}
      <div className="mb-8 flex justify-center">
        <button
          className={`rounded-t-lg px-6 py-3 text-lg font-semibold transition-colors ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`rounded-t-lg px-6 py-3 text-lg font-semibold transition-colors ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-white"> 
          {isLogin ? "Welcome Back" : "Join DevConnect"}
        </h2>
        <p className="mt-2 text-gray-300"> 
          {isLogin
            ? "Sign in to your account"
            : "Create your developer profile"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-white" 
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Enter your username"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-white" 
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-white" 
            >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-700 bg-red-900/30 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-400 hover:underline" 
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

export default Auth;