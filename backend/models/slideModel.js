const mongoose = require("mongoose");

const slideModel = mongoose.Schema(
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
const Slide = mongoose.model("Slide", slideModel);
module.exports = Slide;
