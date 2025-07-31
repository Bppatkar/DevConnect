import React, { useState, useEffect } from "react";
import { FiEdit, FiSave, FiX, FiUser, FiTrash2 } from "react-icons/fi";
import { userApi, projectApi } from "../utils/api";
import ProjectCard from "./ProjectCard.jsx";
import { useNavigate } from "react-router-dom";

function Profile({ user, onClose, profileIdToView }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [userProjects, setUserProjects] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const isCurrentUserProfile = user && profileIdToView === user._id;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      const userIdToFetch = profileIdToView || (user ? user._id : null);

      if (!userIdToFetch) {
        setError("User ID not provided to fetch profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await userApi.getProfile(userIdToFetch);
        setProfileData(response.data.user);
        setFormData({
          username: response.data.user.username,
          email: response.data.user.email,
          bio: response.data.user.bio || "",
        });

        const projectsResponse = await projectApi.getAllProjects();
        const filteredUserProjects = projectsResponse.data.projects.filter(
          (p) => p.owner._id === userIdToFetch,
        );
        setUserProjects(filteredUserProjects);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch profile.";
        setError(errorMessage);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, profileIdToView]);

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
      const response = await userApi.updateProfile(formData);

      if (response.status === 200) {
        setProfileData(response.data.user);
        setIsEditing(false);
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Network error. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProjectFromProfile = async (projectId) => {
    try {
      await projectApi.deleteProject(projectId);
      setUserProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId),
      );
    } catch (err) {
      console.error("Error deleting project from profile:", err);
      setError("Failed to delete project.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await userApi.deleteAccount();
      localStorage.removeItem("token");
      onClose();
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting account:", err);
      setError(err.response?.data?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
      setShowConfirmDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-900 p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="rounded-lg border border-red-700 bg-red-900/30 p-8 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
        <p>Profile not found.</p>
      </div>
    );
  }

  const ProfileContent = (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {isCurrentUserProfile
            ? "My Profile"
            : `${profileData.username}'s Profile`}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-blue-400"
          >
            <FiX className="h-8 w-8" />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
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
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-medium text-white"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-700 text-5xl font-bold text-gray-300">
              <FiUser />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {profileData.username}
              </p>
              <p className="text-lg text-gray-300">{profileData.email}</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <h3 className="mb-2 text-lg font-semibold text-white">About Me</h3>
            <p className="text-base text-gray-300">
              {profileData.bio || "No bio provided yet."}
            </p>
          </div>

          {isCurrentUserProfile && (
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="flex w-full items-center justify-center gap-2 rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                <FiTrash2 className="h-5 w-5" /> Delete Account
              </button>
            </div>
          )}

          <div className="pt-6">
            <h3 className="mb-4 text-2xl font-bold text-white">
              {isCurrentUserProfile
                ? "My Projects"
                : `${profileData.username}'s Projects`}
            </h3>
            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {userProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onViewProfile={
                      onClose
                        ? (userId) => {
                            onClose();

                            console.log(
                              "Attempting to view profile for:",
                              userId,
                            );
                          }
                        : undefined
                    }
                    onDelete={
                      isCurrentUserProfile
                        ? handleDeleteProjectFromProfile
                        : undefined
                    }
                    currentUser={user}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                {isCurrentUserProfile
                  ? "You have not added any projects yet."
                  : "This user has no projects yet."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-sm rounded-lg border border-gray-700 bg-gray-900 p-8 text-center shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-white">
              Confirm Account Deletion
            </h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete your account? This action cannot
              be undone and will delete all your projects.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="rounded bg-gray-700 px-5 py-2 font-semibold text-white transition-colors hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="rounded bg-red-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return onClose ? (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
        {ProfileContent}
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
        {ProfileContent}
      </div>
    </div>
  );
}

export default Profile;
