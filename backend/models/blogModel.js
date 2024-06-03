const mongoose = require("mongoose");
Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Define the User schema
const blogsModel = new Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  blogs: [blogSchema],
});

const Blog = mongoose.model("Blog", blogsModel);
module.exports = Blog;
