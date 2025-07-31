// client/src/components/ProjectForm.jsx
import React, { useState } from 'react';
import { FiX, FiPlusCircle } from 'react-icons/fi'; 
import { projectApi } from '../utils/api'; 

function ProjectForm({ onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    links: [''], 
    technologies: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const addLinkField = () => {
    setFormData({ ...formData, links: [...formData.links, ''] });
  };

  const removeLinkField = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const technologiesArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);

      const projectData = {
        title: formData.title,
        description: formData.description,
        links: formData.links.filter(link => link.trim() !== ''), // Filter out empty links
        technologies: technologiesArray,
      };

      const response = await projectApi.createProject(projectData);

      if (response.status === 200 || response.status === 201) { // Assuming 200 or 201 for success
        onProjectAdded(response.data); // Pass the created project data
      } else {
        setError(response.data.message || 'Failed to create project');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Network error. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-primary bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-background-DEFAULT">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">Add New Project</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <FiX className="w-8 h-8" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="My Awesome Project"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="form-input resize-none"
                placeholder="Describe your project, what it does, and what technologies you used..."
                required
              ></textarea>
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-text-primary mb-2">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="form-input"
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
              />
              <p className="text-xs text-text-light mt-1">Separate technologies with commas (e.g., React, Node.js)</p>
            </div>

            {/* Links */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Relevant Links
              </label>
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="form-input flex-grow"
                    placeholder={`Link ${index + 1} (e.g., GitHub, Live Demo)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLinkField(index)}
                    className="text-danger hover:text-red-700 transition-colors"
                    title="Remove link"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLinkField}
                className="btn bg-light-background text-text-secondary hover:bg-gray-300 text-sm px-4 py-2 mt-2"
              >
                <FiPlusCircle className="w-4 h-4" /> Add Another Link
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="text-danger text-sm bg-danger/10 p-3 rounded-lg border border-danger">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn bg-light-background text-text-primary hover:bg-gray-300 flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
