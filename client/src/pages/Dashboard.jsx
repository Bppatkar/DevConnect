import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectForm from "../components/ProjectForm";
import SearchBar from "../components/SearchBar";
import Profile from "../components/Profile";
import { projectApi, userApi } from "../utils/api";
import { FiPlusCircle, FiUser, FiSearch, FiTrash } from "react-icons/fi";

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileIdToView, setProfileIdToView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
        const projectSearchResults =
          await projectApi.searchProjects(searchQuery);
        const userSearchResults = await userApi.searchUsers(searchQuery);

        const uniqueProjects = new Map();

        projectSearchResults.data.projects.forEach((p) =>
          uniqueProjects.set(p._id, p),
        );

        for (const foundUser of userSearchResults.data.users) {
          projects
            .filter((p) => p.owner._id === foundUser._id)
            .forEach((p) => uniqueProjects.set(p._id, p));
        }

        setFilteredProjects(Array.from(uniqueProjects.values()));
      } catch (err) {
        console.error("Error during search:", err);
        setError("Failed to perform search.");
        setFilteredProjects([]);
      }
    };

    filterAndSearchProjects();
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await projectApi.getAllProjects();
      setProjects(response.data.projects);
      setFilteredProjects(response.data.projects);
    } catch (err) {
      setError("Failed to fetch projects. Please try again later.");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectAdded = (newProject) => {
    setProjects([newProject, ...projects]);
    setShowProjectForm(false);
  };

  const handleProjectUpdated = (updatedProject) => { // New: Handler for updated project
    setProjects(prevProjects => prevProjects.map(p => p._id === updatedProject._id ? updatedProject : p));
    setFilteredProjects(prevFilteredProjects => prevFilteredProjects.map(p => p._id === updatedProject._id ? updatedProject : p));
    setShowProjectForm(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openProfileModal = (userId) => {
    setProfileIdToView(userId);
    setShowProfileModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await projectApi.deleteProject(projectId); // Call API to delete project
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId),
      );
      setFilteredProjects((prevFilteredProjects) =>
        prevFilteredProjects.filter((project) => project._id !== projectId),
      );
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project.");
    }
  };

  const handleDeleteAllProjects = async () => {
    try {
      // Filter projects to only delete those owned by the current user
      const userOwnedProjects = projects.filter(
        (project) => project.owner._id === user._id
      );

      await Promise.all(
        userOwnedProjects.map((project) => projectApi.deleteProject(project._id)),
      );
      // After successful deletion, refetch projects to update the list
      fetchProjects();
    } catch (err) {
      console.error("Error deleting all projects:", err);
      setError("Failed to delete all projects.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-white">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-lg text-gray-300">
            Discover amazing projects and share your own work.
          </p>
        </div>
        <div className="mt-4 flex gap-3 md:mt-0">
          <button
            onClick={() => openProfileModal(user?._id)}
            className="flex items-center gap-2 rounded bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            <FiUser className="h-5 w-5" /> View Profile
          </button>
          <button
            onClick={() => setShowProjectForm(true)}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <FiPlusCircle className="h-5 w-5" /> Add Project
          </button>
          <button
            onClick={handleDeleteAllProjects}
            className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition-colors"
          >
            <FiTrash className="h-5 w-5" /> Delete All My Projects
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 p-3 text-center text-red-400">
          {error}
        </div>
      )}

      {/* Projects Section */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id || index}
              project={project}
              onViewProfile={openProfileModal}
              onDelete={handleDeleteProject}
              currentUser={user} // Pass current user to ProjectCard for conditional delete button
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-900/50 p-8 py-12 text-center border border-gray-800">
          <div className="mb-4 text-gray-500">
            <FiSearch className="mx-auto h-16 w-16" />
          </div>
          <h3 className="mb-2 text-xl font-medium text-white">
            No projects found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or be the first to add a project!
          </p>
        </div>
      )}

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm
          onClose={() => setShowProjectForm(false)}
          onProjectAdded={handleProjectAdded}
          onProjectUpdated={handleProjectUpdated} // Pass handler for updates
        />
      )}

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

export default Dashboard;