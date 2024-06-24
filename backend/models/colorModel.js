const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  navBar: {
    type: String,
    required: true,
  },
  navBarText: {
    type: String,
    required: true,
  },
  navBarHover: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  para: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model("Color", colorSchema);
module.exports = Color;
