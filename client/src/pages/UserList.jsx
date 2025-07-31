import React, { useState, useEffect } from "react";
import { userApi } from "../utils/api";
import { FiUser, FiSearch } from "react-icons/fi";
import Profile from "../components/Profile"; // Import Profile component

function UserList({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await userApi.getAllUsers();
        setUsers(response.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openProfileModal = (userId) => {
    setProfileIdToView(userId);
    setShowProfileModal(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-900/30 p-8 text-center text-red-400 border border-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-white">All Developers</h1>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((userItem) => (
            <div
              key={userItem._id}
              className="flex flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg border border-gray-800"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-800 text-5xl font-bold text-gray-400 mb-4">
                <FiUser />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {userItem.username}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 text-center">
                {userItem.bio || "No bio provided."}
              </p>
              <button
                onClick={() => openProfileModal(userItem._id)}
                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-900/50 p-8 py-12 text-center border border-gray-800">
          <div className="mb-4 text-gray-500">
            <FiSearch className="mx-auto h-16 w-16" />
          </div>
          <h3 className="mb-2 text-xl font-medium text-white">
            No users found
          </h3>
          <p className="text-gray-400">
            It looks like there are no registered users yet.
          </p>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <Profile
          user={user} // Pass current authenticated user to Profile
          onClose={() => setShowProfileModal(false)}
          profileIdToView={profileIdToView}
        />
      )}
    </div>
  );
}

export default UserList;
