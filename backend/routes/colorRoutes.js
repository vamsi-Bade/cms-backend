const express = require("express");
const { createColor, getColor } = require("../controllers/colorController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postColor").post(protect, createColor);
router.route("/").get(getColor);

module.exports = router;
