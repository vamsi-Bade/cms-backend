const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, companyName, phone, url } = req.body;

  if (!name || !email || !password || !companyName || !phone) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({
    url: url.toLowerCase(),
  });

  if (userExists && email !== userExists.email) {
    res.status(400);
    throw new Error("User already exists with this url Try another company.");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    pic: pic,
    companyName: companyName.toLowerCase(),
    phone: phone,
    status: "active",
    role: "user",
    url: url,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      phone: user.phone,
      role: user.role,
      status: user.status,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("User Aldready Exists");
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (user.status == "inActive") {
      res.status(401).send("You are Inactive");
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      phone: user.phone,
      pic: user.pic,
      token: generateToken(user._id),
      role: user.role,
      url: user.url,
    });
  } else {
    res.status(401).send("Invalid Email or Password");
    throw new Error("Invalid Email or Password");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    User.find({}).then((users) => res.json(users));
  } catch (err) {
    res.status(400);
    throw new Error(error.message);
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { name, emailId, phone, status, role, companyName, url, password } =
      req.body.params;
    const user = await User.findOne({ email: emailId });
    if (url.toLowerCase() != user.url.toLowerCase()) {
      const userExists = await User.findOne({
        url: url,
      });
      if (userExists && emailId !== userExists.email) {
        res.status(400);
        throw new Error(
          "User already exists in this company Try another company."
        );
      }
    }
    user.name = name;
    user.phone = phone;
    user.status = status;
    user.role = role;
    user.email = emailId;
    user.companyName = companyName.toLowerCase();
    user.url = url;
    if (password) {
      user.password = password;
    }
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const checkURL = asyncHandler(async (req, res) => {
  try {
    const { url, email } = req.query;
    const userExists = await User.findOne({ url: url });
    if (email !== userExists.email && userExists) {
      res.status(201).send({ exists: true });
    } else {
      res.status(201).send({ exists: false });
    }
  } catch (err) {
    res.json(400).send("Error occured");
    throw new Error(err);
  }
});
module.exports = {
  allUsers,
  registerUser,
  authUser,
  getUsers,
  editUser,
  checkURL,
};
