const express = require("express");
const {
  createService,
  getServices,
  deleteService,
  changeStatus,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postService").post(protect, createService);
router.route("/").get(getServices);
router.route("/deleteService").put(deleteService);
router.route("/changeStatus").put(changeStatus);
module.exports = router;
