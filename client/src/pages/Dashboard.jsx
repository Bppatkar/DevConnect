import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import SearchBar from '../components/SearchBar';
import Profile from '../components/Profile';

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.owner.username.toLowerCase().includes(query.toLowerCase()) ||
      project.technologies?.some(tech => 
        tech.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProjects(filtered);
  };

  const handleProjectAdded = (newProject) => {
    setProjects([newProject, ...projects]);
    setFilteredProjects([newProject, ...filteredProjects]);
    setShowProjectForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-text-secondary">
            Discover amazing projects and share your own work.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowProfile(true)}
            className="btn bg-gray-100 text-text-primary hover:bg-gray-200"
          >
            View Profile
          </button>
          <button
            onClick={() => setShowProjectForm(true)}
            className="btn btn-primary"
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No projects found</h3>
          <p className="text-text-secondary">Try adjusting your search or be the first to add a project!</p>
        </div>
      )}

      {/* Modals */}
      {showProjectForm && (
        <ProjectForm 
          onClose={() => setShowProjectForm(false)}
          onProjectAdded={handleProjectAdded}
        />
      )}

      {showProfile && (
        <Profile 
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;