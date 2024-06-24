const mongoose = require("mongoose");

const aboutModel = mongoose.Schema(
  {
    aboutContent: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contactNumber: { type: String, required: true, trim: true },
    emailId: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    logoid: {
      type: String,
      trim: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    aboutImage: {
      type: String,
      trim: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    address: { type: String, required: true, trim: true },
    mapURL: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const About = mongoose.model("About", aboutModel);
module.exports = About;
