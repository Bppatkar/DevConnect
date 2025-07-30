import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  const { _id, title, description, technologies, owner, likes, comments } = project;

  return (
    <div className="card p-6 hover:shadow-card transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-text-secondary">
            by {owner.username}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="bg-primary-light text-primary text-xs px-2 py-1 rounded-lg font-medium"
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes?.length || 0}</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{comments?.length || 0}</span>
          </span>
        </div>

        <Link
          to={`/project/${_id}`}
          className="text-primary hover:text-primary-dark text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;