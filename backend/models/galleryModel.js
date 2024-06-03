const mongoose = require("mongoose");

const galleryModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageIds: [
      {
        type: String,
        trim: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    ],
    emailId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Gallery = mongoose.model("Gallery", galleryModel);
module.exports = Gallery;
