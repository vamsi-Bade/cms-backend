const asyncHandler = require("express-async-handler");

const Blog = require("../models/blogModel.js");

const createBlog = asyncHandler(async (req, res) => {
  const { blogTitle, blogContent, imageId, emailId, shortDesc } = req.body;

  if (!blogTitle || !blogContent || !imageId || !shortDesc) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    Blog.findOne({ emailId: req.body.emailId })
      .then((blog) => {
        if (blog) {
          blog.blogs.push({
            blogTitle: blogTitle,
            blogContent: blogContent,
            imageId: imageId,
            shortDesc: shortDesc,
          });

          return blog.save();
        } else {
          const blogData = {
            blogTitle: blogTitle,
            blogContent: blogContent,
            imageId: imageId,
            shortDesc: shortDesc,
          };
          return Blog.create({ emailId: emailId, blogs: [blogData] });
        }
      })
      .then((uBlog) => {
        res.json(uBlog);
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const getBlogs = asyncHandler(async (req, res) => {
  const emailId = req.query.emailId;
  try {
    Blog.findOne({ emailId: emailId }).then((blog) => res.json(blog));
  } catch (err) {
    console.log(err);
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId, emailId } = req.body;
  try {
    let blog = await Blog.findOne({ emailId: emailId });
    blog.blogs.splice(blogId + 1, 1);
    blog.save();
    res
      .status(200)
      .json({ success: true, message: "Blogs updated successfully" });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { createBlog, getBlogs, deleteBlog };
