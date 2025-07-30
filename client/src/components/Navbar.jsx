import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="text-xl font-bold text-text-primary">DevConnect</span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary text-sm">
              Hello, <span className="font-medium text-text-primary">{user.username}</span>
            </span>
            <button
              onClick={onLogout}
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;