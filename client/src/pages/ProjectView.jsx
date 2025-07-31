import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { projectApi } from "../utils/api";
import {
  FiHeart,
  FiMessageSquare,
  FiGithub,
  FiExternalLink,
  FiUser,
  FiArrowLeft, 
  FiEdit, 
} from "react-icons/fi";
import Profile from "../components/Profile";
import ProjectForm from "../components/ProjectForm"; 

function ProjectView({ user }) {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [project, setProject] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);
  const [showEditProjectForm, setShowEditProjectForm] = useState(false); 

  const fetchProjectDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await projectApi.getProjectById(id);
      setProject(response.data.project);
    } catch (err) {
      setError(
        err.response?.data?.message || "Error fetching project details.",
      );
      console.error("Error fetching project:", err);
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
      setError("Comment cannot be empty.");
      return;
    }
    setCommentLoading(true);
    setError("");

    try {
      const response = await projectApi.addComment(id, {
        text: newCommentText,
      });
      setProject((prevProject) => ({
        ...prevProject,
        comments: response.data.comments,
      }));
      setNewCommentText("");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding comment.");
      console.error("Error adding comment:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleToggleLike = async () => {
    setError("");
    try {
      const response = await projectApi.toggleLike(id);
      setProject(response.data.project);
    } catch (err) {
      setError(err.response?.data?.message || "Error toggling like.");
      console.error("Error toggling like:", err);
    }
  };

  const openProfileModal = (userId) => {
    setProfileIdToView(userId);
    setShowProfileModal(true);
  };

  const handleProjectUpdated = (updatedProject) => {
    setProject(updatedProject); 
    setShowEditProjectForm(false); 
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="rounded-lg bg-red-900/30 p-8 text-center text-red-400 border border-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-center text-gray-400 bg-gray-900 rounded-lg border border-gray-800">
        <p>Project not found.</p>
      </div>
    );
  }

  const isOwner = user && project.owner && user._id === project.owner._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-gray-900 p-8 shadow-lg border border-gray-800">
        {/* Project Header with Back Button and Edit Button */}
        <div className="mb-6 flex flex-col items-start justify-between border-b border-gray-700 pb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              title="Go back"
            >
              <FiArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold text-white">
                {project.title}
              </h1>
              <button
                onClick={() => openProfileModal(project.owner._id)}
                className="flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300"
              >
                <FiUser className="h-5 w-5" /> {project.owner?.username}
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            {isOwner && (
              <button
                onClick={() => setShowEditProjectForm(true)}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
                title="Edit Project"
              >
                <FiEdit className="h-5 w-5" /> Edit
              </button>
            )}
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors ${
                project.likes && user && project.likes.includes(user._id)
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FiHeart className="h-5 w-5" /> {project.likes?.length || 0}
            </button>
            <span className="flex items-center gap-2 text-gray-400">
              <FiMessageSquare className="h-5 w-5" />{" "}
              {project.comments?.length || 0}
            </span>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Description
          </h2>
          <p className="whitespace-pre-wrap text-gray-300">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-800 px-4 py-2 text-base font-medium text-blue-200"
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
            <h2 className="mb-3 text-2xl font-semibold text-white">Links</h2>
            <div className="flex flex-col gap-2">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-blue-400 hover:underline"
                >
                  {link.includes("github.com") ? (
                    <FiGithub className="h-5 w-5" />
                  ) : (
                    <FiExternalLink className="h-5 w-5" />
                  )}
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Comments
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-grow rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add a comment..."
              required
            />
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
              disabled={commentLoading}
            >
              {commentLoading ? "Posting..." : "Post"}
            </button>
          </form>

          {/* Comments List */}
          {project.comments && project.comments.length > 0 ? (
            <div className="space-y-4">
              {project.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-lg bg-gray-800 p-4 shadow-sm border border-gray-700"
                >
                  <p className="mb-1 text-base text-gray-200">{comment.text}</p>
                  <p className="text-xs text-gray-400">
                    by{" "}
                    {comment.user ? (
                      <button
                        onClick={() => openProfileModal(comment.user._id)}
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {comment.user.username}
                      </button>
                    ) : (
                      <span className="text-gray-500">Unknown User</span>
                    )}{" "}
                    on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No comments yet. Be the first to leave feedback!
            </p>
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

      {/* Edit Project Form Modal */}
      {showEditProjectForm && (
        <ProjectForm
          onClose={() => setShowEditProjectForm(false)}
          projectToEdit={project} 
          onProjectUpdated={handleProjectUpdated} 
        />
      )}
    </div>
  );
}

export default ProjectView;