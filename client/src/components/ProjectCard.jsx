import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageSquare, FiTrash } from "react-icons/fi";

function ProjectCard({ project, onViewProfile, onDelete, currentUser }) {
  const { _id, title, description, technologies, owner, likes, comments } =
    project;

  const isOwner = currentUser && owner && currentUser._id === owner._id;

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-1 text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={() => onViewProfile(owner?._id)} // Use optional chaining to avoid errors
            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            by {owner?.username || "Unknown"}
          </button>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(_id)} // Pass project ID to the callback
            className="text-red-600 transition-colors hover:text-red-800"
            title="Delete Project"
          >
            <FiTrash className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-3 flex-grow text-sm text-gray-600">
        {description}
      </p>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-xs text-gray-500">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FiHeart className="h-4 w-4 text-red-500" />
            <span>{likes?.length || 0}</span>
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare className="h-4 w-4 text-blue-500" />
            <span>{comments?.length || 0}</span>
          </span>
        </div>

        <Link
          to={`/project/${_id}`}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
