const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
});
const galleryModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    images: [imageSchema],
    emailId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Gallery = mongoose.model("Gallery", galleryModel);
module.exports = Gallery;
