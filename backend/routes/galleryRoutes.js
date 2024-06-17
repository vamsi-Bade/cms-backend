const express = require("express");
const {
  createGallery,
  getGallerys,
  deleteGallery,
  changeStatus,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/postGallery").post(protect, createGallery);
router.route("/").get(getGallerys);
router.route("/deleteGallery").put(deleteGallery);
router.route("/changeStatus").put(changeStatus);
module.exports = router;
