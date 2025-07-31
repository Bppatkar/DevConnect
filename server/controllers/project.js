import Project from '../models/Project.js';
import User from '../models/User.js';

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'username email')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'username email bio')
      .populate('comments.user', 'username');

    if (!project) {
      return next({ message: 'Project not found', statusCode: 404 });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, description, links, technologies } = req.body;

    const validatedLinks = Array.isArray(links)
      ? links.filter((link) => typeof link === 'string' && link.trim() !== '')
      : [];
    const validatedTechnologies = Array.isArray(technologies)
      ? technologies.filter(
          (tech) => typeof tech === 'string' && tech.trim() !== ''
        )
      : [];

    const project = new Project({
      title,
      description,
      links: validatedLinks,
      technologies: validatedTechnologies,
      owner: req.user._id,
    });

    await project.save();
    await project.populate('owner', 'username email');
    await project.populate('comments.user', 'username');

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { projects: project._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

router.put('/:id', auth, async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return next({ message: 'Project not found', statusCode: 404 });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return next({
        message: 'Not authorized to update this project',
        statusCode: 403,
      });
    }

    if (req.body.links !== undefined) {
      req.body.links = Array.isArray(req.body.links)
        ? req.body.links.filter(
            (link) => typeof link === 'string' && link.trim() !== ''
          )
        : [];
    }
    if (req.body.technologies !== undefined) {
      req.body.technologies = Array.isArray(req.body.technologies)
        ? req.body.technologies.filter(
            (tech) => typeof tech === 'string' && tech.trim() !== ''
          )
        : [];
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('owner', 'username email')
      .populate('comments.user', 'username');

    res.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next({ message: 'Project not found', statusCode: 404 });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return next({
        message: 'Not authorized to delete this project',
        statusCode: 403,
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { projects: req.params.id },
    });

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return next({ message: 'Comment text is required', statusCode: 400 });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return next({ message: 'Project not found', statusCode: 404 });
    }

    const comment = {
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date(),
    };

    project.comments.push(comment);
    await project.save();

    await project.populate('comments.user', 'username');

    res.status(201).json({
      success: true,
      comments: project.comments,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next({ message: 'Project not found', statusCode: 404 });
    }

    const userId = req.user._id;
    const likeIndex = project.likes.findIndex(
      (like) => like.toString() === userId.toString()
    );

    let likedStatus;
    if (likeIndex > -1) {
      project.likes.splice(likeIndex, 1);
      likedStatus = false;
    } else {
      project.likes.push(userId);
      likedStatus = true;
    }

    await project.save();

    const updatedProject = await Project.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('comments.user', 'username');

    res.json({
      success: true,
      project: updatedProject,
      liked: likedStatus,
      message: likedStatus ? 'Project liked' : 'Project unliked',
    });
  } catch (error) {
    next(error);
  }
};

export const searchProjects = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return next({ message: 'Search query (q) is required', statusCode: 400 });
    }

    const searchRegex = new RegExp(q, 'i');

    const projects = await Project.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { technologies: { $in: [searchRegex] } },
      ],
    })
      .populate('owner', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};
