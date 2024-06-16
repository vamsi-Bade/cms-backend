const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUsers,
  editUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getUsers);

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/editUser").put(protect, editUser);

module.exports = router;
