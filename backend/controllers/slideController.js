const asyncHandler = require("express-async-handler");

const Slide = require("../models/slideModel");

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

    // Update imageIds array
    slide.imageIds.push(...imageIds);
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
    const email = req.query.email;
    Slide.findOne({ emailId: email }).then((slides) => res.json(slides));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteSlide = asyncHandler(async (req, res) => {
  try {
    const { imageUrl, emailId } = req.body.params;
    let slide = await Slide.findOne({ emailId: emailId });

    const newArr = slide.imageIds.filter((e) => e !== imageUrl);
    slide.imageIds = newArr;

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
module.exports = { createSlide, getSlides, deleteSlide };
