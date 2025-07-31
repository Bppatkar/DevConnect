import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import SearchBar from '../components/SearchBar';
import Profile from '../components/Profile';
import { projectApi, userApi } from '../utils/api';
import { FiPlusCircle, FiUser, FiSearch } from 'react-icons/fi';

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filterAndSearchProjects = async () => {
      if (!searchQuery.trim()) {
        setFilteredProjects(projects);
        return;
      }
      try {
        const projectSearchResults = await projectApi.searchProjects(
          searchQuery
        );
        const userSearchResults = await userApi.searchUsers(searchQuery);

        const uniqueProjects = new Map();

        projectSearchResults.data.projects.forEach((p) =>
          uniqueProjects.set(p._id, p)
        ); // Access .projects

        for (const foundUser of userSearchResults.data.users) {
          // Access .users
          projects
            .filter((p) => p.owner._id === foundUser._id)
            .forEach((p) => uniqueProjects.set(p._id, p));
        }

        setFilteredProjects(Array.from(uniqueProjects.values()));
      } catch (err) {
        console.error('Error during search:', err);
        setError('Failed to perform search.');
        setFilteredProjects([]);
      }
    };

    filterAndSearchProjects();
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await projectApi.getAllProjects();
      // FIX HERE: Access response.data.projects
      setProjects(response.data.projects);
      setFilteredProjects(response.data.projects);
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectAdded = (newProject) => {
    setProjects([newProject, ...projects]);
    setShowProjectForm(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-text-secondary text-lg">
            Discover amazing projects and share your own work.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => openProfileModal(user?._id)}
            className="btn bg-light-background text-text-primary hover:bg-gray-300"
          >
            <FiUser /> View Profile
          </button>
          <button
            onClick={() => setShowProjectForm(true)}
            className="btn btn-primary"
          >
            <FiPlusCircle /> Add Project
          </button>
        </div>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="text-danger text-center bg-danger/10 p-3 rounded-lg border border-danger mb-4">
          {error}
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onViewProfile={() => openProfileModal(project.owner._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-light-background rounded-lg p-8">
          <div className="text-text-light mb-4">
            <FiSearch className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-text-primary mb-2">
            No projects found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search or be the first to add a project!
          </p>
        </div>
      )}

      {showProjectForm && (
        <ProjectForm
          onClose={() => setShowProjectForm(false)}
          onProjectAdded={handleProjectAdded}
        />
      )}

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

export default Dashboard;
