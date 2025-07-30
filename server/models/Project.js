import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    links: {
      github: {
        type: String,
        validate: {
          validator: function (v) {
            return !v || /^https?:\/\//.test(v);
          },
          message: 'Please enter a valid URL',
        },
      },
      live: {
        type: String,
        validate: {
          validator: function (v) {
            return !v || /^https?:\/\//.test(v);
          },
          message: 'Please enter a valid URL',
        },
      },
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: [true, 'Comment text is required'],
          maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
projectSchema.index({
  title: 'text',
  description: 'text',
  technologies: 'text',
});

export default mongoose.model('Project', projectSchema);
