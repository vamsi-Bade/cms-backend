const express = require("express");
const { createAbout, getAbouts } = require("../controllers/aboutController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postAbout").post(protect, createAbout);
router.route("/").get(getAbouts);

module.exports = router;
