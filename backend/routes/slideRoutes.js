const express = require("express");
const {
  createSlide,
  getSlides,
  deleteSlide,
} = require("../controllers/slideController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postSlides").post(protect, createSlide);
router.route("/").get(getSlides);
router.route("/deleteSlide").put(deleteSlide);
module.exports = router;
