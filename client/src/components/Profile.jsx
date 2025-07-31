// client/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiX, FiUser } from 'react-icons/fi'; // Importing icons
import { userApi, projectApi } from '../utils/api'; // Import API functions
import ProjectCard from './ProjectCard'; // To display user's projects

function Profile({ user, onClose, profileIdToView }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null); // Data for the profile being viewed
  const [formData, setFormData] = useState({ // Data for editing
    username: '',
    email: '',
    bio: ''
  });
  const [userProjects, setUserProjects] = useState([]);

  // Determine if the profile being viewed is the current logged-in user's profile
  const isCurrentUserProfile = profileIdToView === user._id;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const userIdToFetch = profileIdToView || user._id; // Default to current user if no specific ID is passed
        const response = await userApi.getProfile(userIdToFetch);
        setProfileData(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          bio: response.data.bio || ''
        });

        // Fetch projects for this user
        // Note: Backend needs a route to get projects by user ID, or we filter from all projects.
        // For now, let's assume projectApi.searchProjects can filter by owner username.
        // A dedicated endpoint like /api/users/:userId/projects would be more efficient.
        const projectsResponse = await projectApi.searchProjects(response.data.username);
        setUserProjects(projectsResponse.data.filter(p => p.owner._id === userIdToFetch));

      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch profile.';
        setError(errorMessage);
        setProfileData(null); // Clear profile data on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, profileIdToView]); // Re-fetch if current user or the ID of the profile to view changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // userApi.updateProfile explicitly handles token
      const response = await userApi.updateProfile(formData);

      if (response.status === 200) {
        setProfileData(response.data); // Update displayed profile with new data
        setIsEditing(false); // Exit edit mode
        // If this profile is the current user's, update the App.jsx user state
        if (isCurrentUserProfile) {
          // You might need a prop to update the user in App.jsx if it's not the same object
          // For simplicity, we'll just re-fetch in App.jsx's useEffect if needed
        }
        if (onClose) onClose(); // Close modal if it's a modal
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Network error. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="text-center p-8 text-danger bg-danger/10 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center p-8 text-text-secondary">
        <p>Profile not found.</p>
      </div>
    );
  }

  const ProfileContent = (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">
          {isCurrentUserProfile ? 'My Profile' : `${profileData.username}'s Profile`}
        </h2>
        {onClose && ( // Show close button only if in a modal
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <FiX className="w-8 h-8" />
          </button>
        )}
      </div>

      {error && (
        <div className="text-danger text-sm bg-danger/10 p-3 rounded-lg border border-danger mb-4">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="form-input resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn bg-light-background text-text-primary hover:bg-gray-300 flex-1"
            >
              <FiX /> Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Saving...' : <><FiSave /> Save Changes</>}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 bg-light-background rounded-full flex items-center justify-center text-text-secondary text-5xl font-bold">
              <FiUser /> {/* Placeholder for profile picture */}
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary">{profileData.username}</p>
              <p className="text-lg text-text-secondary">{profileData.email}</p>
            </div>
          </div>

          <div className="bg-light-background p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">About Me</h3>
            <p className="text-text-secondary text-base whitespace-pre-wrap">
              {profileData.bio || 'No bio provided yet.'}
            </p>
          </div>

          {isCurrentUserProfile && (
            <div className="pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary w-full"
              >
                <FiEdit /> Edit Profile
              </button>
            </div>
          )}

          <div className="pt-6">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {isCurrentUserProfile ? 'My Projects' : `${profileData.username}'s Projects`}
            </h3>
            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">
                {isCurrentUserProfile ? 'You have not added any projects yet.' : 'This user has no projects yet.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Render as a modal if onClose is provided, otherwise render directly
  return onClose ? (
    <div className="fixed inset-0 bg-dark-primary bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-background-DEFAULT">
        {ProfileContent}
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-background-DEFAULT">
        {ProfileContent}
      </div>
    </div>
  );
}

export default Profile;
