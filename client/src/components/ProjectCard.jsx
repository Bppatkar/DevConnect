import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageSquare, FiTrash, FiEdit } from "react-icons/fi";

function ProjectCard({ project, onViewProfile, onDelete, currentUser, onEditProject }) {
  const { _id, title, description, technologies, owner, likes, comments } = project;
  const isOwner = currentUser && owner && currentUser._id === owner._id;

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-1 text-xl font-semibold text-white">
            {title}
          </h3>
          <button
            onClick={() => onViewProfile(owner?._id)}
            className="text-sm font-medium text-gray-400 transition-colors hover:text-blue-400"
          >
            by {owner?.username || "Unknown"}
          </button>
        </div>
        <div className="flex gap-2">
          {isOwner && onEditProject && (
            <button
              onClick={() => onEditProject(project)}
              className="text-blue-400 transition-colors hover:text-blue-600"
              title="Edit Project"
            >
              <FiEdit className="h-5 w-5" />
            </button>
          )}
          {isOwner && (
            <button
              onClick={() => onDelete(_id)}
              className="text-red-400 transition-colors hover:text-red-600"
              title="Delete Project"
            >
              <FiTrash className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      <p className="mb-4 line-clamp-3 flex-grow text-sm text-gray-300">
        {description}
      </p>
      {technologies && technologies.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-800 px-3 py-1 text-xs font-medium text-blue-200"
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
      <div className="mt-auto flex items-center justify-between border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FiHeart className="h-4 w-4 text-red-400" />
            <span>{likes?.length || 0}</span>
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare className="h-4 w-4 text-blue-400" />
            <span>{comments?.length || 0}</span>
          </span>
        </div>
        <Link
          to={`/project/${_id}`}
          className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
