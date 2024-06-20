const asyncHandler = require("express-async-handler");

const Slide = require("../models/slideModel");
const User = require("../models/userModel");

const createSlide = asyncHandler(async (req, res) => {
  const images = req.body;

  if (!images) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const userId = req.body.user._id; // Assuming userId is sent from the frontend
    const imageIds = req.body.images; // Assuming imageIds array is sent from the frontend
    const email = req.body.user.email;
    // Find the slide by user._id
    let slide = await Slide.findOne({ user: userId });
    // If slide not found, create a new slide instance with the user
    if (!slide) {
      slide = new Slide({ user: userId });
    }
    const images = imageIds.map((imageUrl) => {
      return {
        imageId: imageUrl,
        status: "active",
      };
    });
    slide.images.push(...images);
    slide.emailId = email;
    // Save the slide
    await slide.save();

    res
      .status(200)
      .json({ success: true, message: "Slide updated successfully" });
  } catch (error) {
    console.error("Error updating slide:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getSlides = asyncHandler(async (req, res) => {
  try {
    const { companyName } = req.query;
    const user = await User.findOne({ companyName: companyName });
    const emailId = user.email;
    Slide.findOne({ emailId: emailId }).then((slides) => res.json(slides));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const changeStatus = asyncHandler(async (req, res) => {
  try {
    const { imageUrl, emailId, status } = req.body.params;

    let slide = await Slide.findOne({ emailId: emailId });

    const index = slide.images.findIndex((x) => {
      return x.imageId == imageUrl;
    });
    slide.images.at(index).status = status;
    await slide.save();
    res.json(200);
  } catch (err) {
    res.json(400);
    throw new Error(err.message);
  }
});
const deleteSlide = asyncHandler(async (req, res) => {
  try {
    const { imageUrl, emailId } = req.body.params;
    let slide = await Slide.findOne({ emailId: emailId });

    const newArr = slide.images.filter((e) => e.imageId !== imageUrl);
    slide.images = newArr;

    slide.save();

    res
      .status(200)
      .json({ success: true, message: "Slide updated successfully" });
  } catch (err) {
    res.status(400);
    console.log(err);
    throw new Error(err.message);
  }
});
module.exports = { createSlide, getSlides, deleteSlide, changeStatus };
