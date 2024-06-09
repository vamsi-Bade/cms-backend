const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    emailId: { type: String, trim: true },
    notifications: [
      {
        notificationTitle: { type: String, trim: true },
        href: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationModel);

module.exports = Notification;
