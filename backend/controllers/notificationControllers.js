const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
//@description     Fetch all notifications for a user
//@route           GET /api/notification
//@access          Protected
const fetchNotification = asyncHandler(async (req, res) => {
  try {
    Notification.find({}).then((notifications) => {
      res.json(notifications);
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const postNotification = asyncHandler(async (req, res) => {
  try {
    const { notificationHeading, notificationDetails, pdf } = req.body;
    const newNotification = new Notification({
      notificationHeading,
      notificationDetails,
      pdf,
    });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ error: "Failed to add notification" });
  }
});

module.exports = { fetchNotification, postNotification };
