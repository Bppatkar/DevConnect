import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectApi } from '../utils/api';
import { FiHeart, FiMessageSquare, FiGithub, FiExternalLink, FiUser } from 'react-icons/fi';
import Profile from '../components/Profile';

function ProjectView({ user }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);

  const fetchProjectDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await projectApi.getProjectById(id);
      setProject(response.data.project); // Access .project property
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching project details.');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    setCommentLoading(true);
    setError('');

    try {
      const response = await projectApi.addComment(id, { text: newCommentText });
      // Assuming backend returns updated project or just the new comments
      // If it returns the new comments, you'll need to update the project state
      setProject(prevProject => ({
        ...prevProject,
        comments: response.data.comments // Update comments with the new populated array
      }));
      setNewCommentText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding comment.');
      console.error('Error adding comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleToggleLike = async () => {
    setError('');
    try {
      const response = await projectApi.toggleLike(id);
      setProject(response.data.project); // Update project with new likes data
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling like.');
      console.error('Error toggling like:', err);
    }
  };

  const openProfileModal = (userId) => {
    setProfileIdToView(userId);
    setShowProfileModal(true);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="text-center p-8 text-danger bg-danger/10 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center p-8 text-text-secondary">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card p-8 bg-background-DEFAULT">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 border-light-background">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              {project.title}
            </h1>
            <button
              onClick={() => openProfileModal(project.owner._id)}
              className="text-primary hover:text-primary-dark text-lg font-medium flex items-center gap-2"
            >
              <FiUser className="w-5 h-5" /> {project.owner?.username} {/* Defensive check here */}
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={handleToggleLike}
              className={`btn px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                project.likes && project.likes.includes(user._id)
                  ? 'bg-danger text-white hover:bg-red-700'
                  : 'bg-light-background text-text-secondary hover:bg-gray-300'
              }`}
            >
              <FiHeart className="w-5 h-5" /> {project.likes?.length || 0}
            </button>
            <span className="flex items-center gap-2 text-text-secondary">
              <FiMessageSquare className="w-5 h-5" /> {project.comments?.length || 0}
            </span>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Description</h2>
          <p className="text-text-secondary whitespace-pre-wrap">{project.description}</p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-accent-teal/10 text-accent-teal text-base px-4 py-2 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-3">Links</h2>
            <div className="flex flex-col gap-2">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center gap-2 text-lg font-medium underline-offset-2 hover:underline"
                >
                  {link.includes('github.com') ? <FiGithub className="w-5 h-5" /> : <FiExternalLink className="w-5 h-5" />}
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8 border-t pt-8 border-light-background">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Comments</h2>

          {error && (
            <div className="text-danger text-sm bg-danger/10 p-3 rounded-lg border border-danger mb-4">
              {error}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="form-input flex-grow"
              placeholder="Add a comment..."
              required
            />
            <button
              type="submit"
              className="btn btn-primary px-6 py-3"
              disabled={commentLoading}
            >
              {commentLoading ? 'Posting...' : 'Post'}
            </button>
          </form>

          {/* Comments List */}
          {project.comments && project.comments.length > 0 ? (
            <div className="space-y-4">
              {project.comments.map((comment) => (
                <div key={comment._id} className="bg-light-background p-4 rounded-lg shadow-sm">
                  <p className="text-text-primary text-base mb-1">{comment.text}</p>
                  <p className="text-text-secondary text-xs">
                    by{' '}
                    {/* Defensive check for comment.user */}
                    {comment.user ? (
                      <button
                        onClick={() => openProfileModal(comment.user._id)}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        {comment.user.username} {/* Line 112 is here */}
                      </button>
                    ) : (
                      <span className="text-text-light">Unknown User</span>
                    )}{' '}
                    on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary">No comments yet. Be the first to leave feedback!</p>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <Profile
          user={user}
          onClose={() => setShowProfileModal(false)}
          profileIdToView={profileIdToView}
        />
      )}
    </div>
  );
}

export default ProjectView;
