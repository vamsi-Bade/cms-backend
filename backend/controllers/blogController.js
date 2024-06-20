const asyncHandler = require("express-async-handler");

const Blog = require("../models/blogModel.js");
const User = require("../models/userModel.js");

const createBlog = asyncHandler(async (req, res) => {
  const { blogTitle, blogContent, imageId, emailId, shortDesc, status } =
    req.body;

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
            status: "active",
          });

          return blog.save();
        } else {
          const blogData = {
            blogTitle: blogTitle,
            blogContent: blogContent,
            imageId: imageId,
            shortDesc: shortDesc,
            status: "active",
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
const changeStatus = asyncHandler(async (req, res) => {
  try {
    const { index, emailId, status } = req.body.params;

    let blog = await Blog.findOne({ emailId: emailId });

    blog.blogs.at(index).status = status;
    await blog.save();
    res.json(200);
  } catch (err) {
    res.json(400);
    throw new Error(err.message);
  }
});
const getBlogs = asyncHandler(async (req, res) => {
  const { url } = req.query;
  const user = await User.findOne({ url: url });
  const emailId = user.email;
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
    blog.blogs.splice(blogId, 1);
    blog.save();
    res
      .status(200)
      .json({ success: true, message: "Blogs updated successfully" });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { createBlog, getBlogs, deleteBlog, changeStatus };
