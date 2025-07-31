import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import UserList from "./pages/UserList"; 
import Navbar from "./components/Navbar";
import { authApi } from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authApi.getMe();
          if (response.status === 200) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        {user && (
          <Navbar
            user={user}
            onLogout={logout}
          />
        )}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Home onLogin={handleAuthSuccess} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? <Dashboard user={user} /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/project/:id"
              element={
                user ? <ProjectView user={user} /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/users" 
              element={
                user ? <UserList user={user} /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="*"
              element={<Navigate to={user ? "/dashboard" : "/"} replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;