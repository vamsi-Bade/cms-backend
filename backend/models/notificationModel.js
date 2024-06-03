const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    notificationHeading: { type: String, trim: true },
    notificationDetails: { type: String, trim: true },
    pdf: {
      type: "String",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationModel);

module.exports = Notification;
