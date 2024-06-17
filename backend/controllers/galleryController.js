const asyncHandler = require("express-async-handler");

const Gallery = require("../models/galleryModel");

const createGallery = asyncHandler(async (req, res) => {
  console.log(req);
  const { images } = req.body;
  if (!images) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const userId = req.body.user._id; // Assuming userId is sent from the frontend
    const imageIds = req.body.images; // Assuming imageIds array is sent from the frontend
    const email = req.body.user.email;
    // Find the gallery by user._id
    let gallery = await Gallery.findOne({ user: userId });

    // If gallery not found, create a new gallery instance with the user
    if (!gallery) {
      gallery = new Gallery({ user: userId });
    }
    const images = imageIds.map((imageUrl) => {
      return {
        imageId: imageUrl,
        status: "active",
      };
    });
    // Update imageIds array
    gallery.images.push(...images);
    gallery.emailId = email;
    // Save the gallery
    await gallery.save();

    res
      .status(200)
      .json({ success: true, message: "Gallery updated successfully" });
  } catch (error) {
    console.error("Error updating gallery:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
const changeStatus = asyncHandler(async (req, res) => {
  try {
    const { imageUrl, emailId, status } = req.body.params;

    let gallery = await Gallery.findOne({ emailId: emailId });

    const index = gallery.images.findIndex((x) => {
      return x.imageId == imageUrl;
    });
    gallery.images.at(index).status = status;
    gallery.save();
    res.json(200);
  } catch (err) {
    res.json(400);
    throw new Error(err.message);
  }
});
const getGallerys = asyncHandler(async (req, res) => {
  try {
    const email = req.query.email;
    Gallery.findOne({ emailId: email }).then((gallery) => res.json(gallery));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const deleteGallery = asyncHandler(async (req, res) => {
  try {
    const { imageUrl, emailId } = req.body.params;
    let gallery = await Gallery.findOne({ emailId: emailId });
    const newArr = gallery.images.filter((e) => e.imageId !== imageUrl);
    gallery.images = newArr;

    gallery.save();

    res
      .status(200)
      .json({ success: true, message: "Gallery updated successfully" });
  } catch (err) {
    res.status(400);
    console.log(err);
    throw new Error(err.message);
  }
});
module.exports = { createGallery, getGallerys, deleteGallery, changeStatus };
