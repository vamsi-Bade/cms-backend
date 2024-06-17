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
const slideModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    emailId: {
      type: String,
      trim: true,
    },
    images: [imageSchema],
  },
  { timestamps: true }
);
const Slide = mongoose.model("Slide", slideModel);
module.exports = Slide;
