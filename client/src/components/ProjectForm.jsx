import React, { useState } from "react";
import { FiX, FiPlusCircle } from "react-icons/fi";
import { projectApi } from "../utils/api";

function ProjectForm({ onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    links: [""],
    technologies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const addLinkField = () => {
    setFormData({ ...formData, links: [...formData.links, ""] });
  };

  const removeLinkField = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech);

      const projectData = {
        title: formData.title,
        description: formData.description,
        links: formData.links.filter((link) => link.trim() !== ""), // Filter out empty links
        technologies: technologiesArray,
      };

      const response = await projectApi.createProject(projectData);

      if (response.status === 200 || response.status === 201) {
        // Assuming 200 or 201 for success
        onProjectAdded(response.data.project); // Pass the created project data, assuming backend returns { success: true, project: ... }
      } else {
        setError(response.data.message || "Failed to create project");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Network error. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-6 shadow-lg border border-gray-700">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">
              Add New Project
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-blue-400"
            >
              <FiX className="h-8 w-8" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-white"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="My Awesome Project"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-white"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full resize-none rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Describe your project, what it does, and what technologies you used..."
                required
              ></textarea>
            </div>

            {/* Technologies */}
            <div>
              <label
                htmlFor="technologies"
                className="mb-2 block text-sm font-medium text-white"
              >
                Technologies (comma separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
              />
              <p className="mt-1 text-xs text-gray-400">
                Separate technologies with commas (e.g., React, Node.js)
              </p>
            </div>

            {/* Links */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Relevant Links
              </label>
              {formData.links.map((link, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="flex-grow rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Link ${index + 1} (e.g., GitHub, Live Demo)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLinkField(index)}
                    className="text-red-400 transition-colors hover:text-red-600"
                    title="Remove link"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLinkField}
                className="mt-2 flex items-center gap-2 rounded bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600"
              >
                <FiPlusCircle className="h-4 w-4" /> Add Another Link
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-700 bg-red-900/30 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? "Creating Project..." : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;