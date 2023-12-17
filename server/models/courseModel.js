import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title of the course"],
    minLength: [5, "Title must be at least 5 characters"],
    maxLength: [50, "Title must be at most 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of the course"],
    minLength: [5, "Description must be at least 5 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numberOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter course creator's name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Course = mongoose.model("Course", schema);
