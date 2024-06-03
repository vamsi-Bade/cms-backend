const asyncHandler = require("express-async-handler");

const About = require("../models/aboutModel.js");

const createAbout = asyncHandler(async (req, res) => {
  const {
    editorState,
    contactNumber,
    email,
    logoImage,
    address,
    currentContent,
    mapURL,
  } = req.body;
  const userEmail = req.body.user.email;
  if (
    !currentContent ||
    !contactNumber ||
    !email ||
    !address ||
    !mapURL ||
    !logoImage
  ) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    About.findOne({ user: req.body.user._id })
      .then((about) => {
        if (about) {
          about.aboutContent = currentContent;
          about.contactNumber = contactNumber;
          about.email = email;
          about.logoid = logoImage;
          about.address = address;
          about.emailId = userEmail;
          about.mapURL = mapURL;

          return about.save();
        } else {
          const aboutData = {
            user: req.user._id,
            aboutContent: currentContent,
            contactNumber: contactNumber,
            email: email,
            logoid: logoImage,
            address: address,
            emailId: userEmail,
            mapURL: mapURL,
          };
          return About.create(aboutData);
        }
      })
      .then((uAbout) => {
        res.json(uAbout);
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const getAbouts = asyncHandler(async (req, res) => {
  const email = req.query.email;
  try {
    About.findOne({ emailId: email }).then((about) => res.json(about));
  } catch (err) {
    console.log(err);
  }
});

module.exports = { createAbout, getAbouts };
