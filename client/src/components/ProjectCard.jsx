import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMessageSquare } from 'react-icons/fi'; 

function ProjectCard({ project }) {
  const { _id, title, description, technologies, owner, likes, comments } = project;

  return (
    <div className="card p-6 bg-background-DEFAULT border border-light-background flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-1 line-clamp-1">
            {title}
          </h3>
          {/* Link to owner's profile - this will trigger the Profile modal in Dashboard */}
          <button
            // This button will trigger a modal or state change in Dashboard to show profile
            onClick={() => console.log(`View profile of ${owner.username}`)} // Placeholder for now
            className="text-text-secondary hover:text-primary text-sm font-medium transition-colors"
          >
            by {owner.username}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">
        {description}
      </p>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="bg-accent-teal/10 text-accent-teal text-xs px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-xs text-text-light">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-light-background">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span className="flex items-center gap-1">
            <FiHeart className="w-4 h-4 text-danger" /> {/* Heart icon */}
            <span>{likes?.length || 0}</span>
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare className="w-4 h-4 text-primary" /> {/* Message icon */}
            <span>{comments?.length || 0}</span>
          </span>
        </div>

        <Link
          to={`/project/${_id}`}
          className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
