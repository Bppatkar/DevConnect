import { useState, useEffect } from "react";
import { FiX, FiUser } from "react-icons/fi";
import { userApi, projectApi } from "../utils/api";
import ProjectCard from "./ProjectCard.jsx";

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

        // Fetch projects owned by this user
        const projectsResponse = await projectApi.getAllProjects(); // Fetch all projects
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
      // Optionally, you might want to refresh the main dashboard projects if this modal is open
    } catch (err) {
      console.error("Error deleting project from profile:", err);
      setError("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="rounded-lg bg-red-100 p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Profile not found.</p>
      </div>
    );
  }

  const ProfileContent = (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          {isCurrentUserProfile
            ? "My Profile"
            : `${profileData.username}'s Profile`}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 transition-colors hover:text-blue-600"
          >
            <FiX className="h-8 w-8" />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300"
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
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-5xl font-bold text-gray-600">
              <FiUser />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {profileData.username}
              </p>
              <p className="text-lg text-gray-600">{profileData.email}</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              About Me
            </h3>
            <p className="text-base text-gray-600">
              {profileData.bio || "No bio provided yet."}
            </p>
          </div>

          {isCurrentUserProfile && (
            <div className="pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          )}

          <div className="pt-6">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
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
                            // If in modal, close current modal and let parent handle new profile modal
                            onClose();
                            // This assumes the parent (Dashboard/ProjectView) has a way to open a new profile modal
                            // For simplicity, we'll just log here, but in a real app, you'd pass a prop to handle this
                            console.log(
                              "Attempting to view profile for:",
                              userId,
                            );
                            // Alternatively, you could directly call openProfileModal from the parent here if it's passed down
                          }
                        : undefined
                    } // Pass undefined if not in a modal context
                    onDelete={
                      isCurrentUserProfile
                        ? handleDeleteProjectFromProfile
                        : undefined
                    } // Only allow deletion if current user and their project
                    currentUser={user} // Pass current user for conditional delete button
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                {isCurrentUserProfile
                  ? "You have not added any projects yet."
                  : "This user has no projects yet."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return onClose ? (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {ProfileContent}
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">{ProfileContent}</div>
    </div>
  );
}

export default Profile;
