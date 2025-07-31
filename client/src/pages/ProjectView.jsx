import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../utils/api";
import {
  FiHeart,
  FiMessageSquare,
  FiGithub,
  FiExternalLink,
  FiUser,
} from "react-icons/fi";
import Profile from "../components/Profile";

function ProjectView({ user }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="rounded-lg bg-red-100 p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-white p-8 shadow-md">
        {/* Project Header */}
        <div className="mb-6 flex flex-col items-start justify-between border-b pb-4 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              {project.title}
            </h1>
            <button
              onClick={() => openProfileModal(project.owner._id)}
              className="flex items-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-800"
            >
              <FiUser className="h-5 w-5" /> {project.owner?.username}
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors ${
                project.likes && project.likes.includes(user._id)
                  ? "bg-red-500 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <FiHeart className="h-5 w-5" /> {project.likes?.length || 0}
            </button>
            <span className="flex items-center gap-2 text-gray-600">
              <FiMessageSquare className="h-5 w-5" />{" "}
              {project.comments?.length || 0}
            </span>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Description
          </h2>
          <p className="whitespace-pre-wrap text-gray-600">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-4 py-2 text-base font-medium text-blue-600"
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
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Links</h2>
            <div className="flex flex-col gap-2">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-blue-600 hover:underline"
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
        <div className="mt-8 border-t pt-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Comments
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500 bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-grow rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="rounded-lg bg-gray-100 p-4 shadow-sm"
                >
                  <p className="mb-1 text-base text-gray-900">{comment.text}</p>
                  <p className="text-xs text-gray-600">
                    by{" "}
                    {comment.user ? (
                      <button
                        onClick={() => openProfileModal(comment.user._id)}
                        className="font-medium text-blue-600 hover:underline"
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
            <p className="text-gray-600">
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
    </div>
  );
}

export default ProjectView;