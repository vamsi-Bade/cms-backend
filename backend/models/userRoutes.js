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

router.route("/").get(getUsers);

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/editUser").put(editUser);

module.exports = router;
