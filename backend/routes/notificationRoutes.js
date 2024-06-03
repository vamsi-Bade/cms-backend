const express = require("express");
const {
  postNotification,
  fetchNotification,
} = require("../controllers/notificationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/postNotification").post(protect, postNotification);
router.route("/").get(protect, fetchNotification);

module.exports = router;
