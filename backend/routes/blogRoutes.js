const express = require("express");
const {
  createBlog,
  getBlogs,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postBlog").post(protect, createBlog);
router.route("/").get(getBlogs);
router.route("/deleteBlog").put(deleteBlog);
module.exports = router;
