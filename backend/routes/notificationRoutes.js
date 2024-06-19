const express = require("express");
const {
  createNotification,
  getNotification,
  deleteNotification,
  changeStatus,
} = require("../controllers/notificationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/postNotification").post(protect, createNotification);
router.route("/").get(getNotification);
router.route("/deleteNotification").put(deleteNotification);
router.route("/changeStatus").put(changeStatus);

module.exports = router;
