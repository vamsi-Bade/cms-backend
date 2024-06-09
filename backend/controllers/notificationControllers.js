const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
//@description     Fetch all notifications for a user
//@route           GET /api/notification
//@access          Protected
const createNotification = asyncHandler(async (req, res) => {
  const { notificationTitle, href, emailId } = req.body;

  if (!notificationTitle || !href) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    Notification.findOne({ emailId: req.body.emailId })
      .then((notification) => {
        if (notification) {
          notification.notifications.push({
            notificationTitle: notificationTitle,
            href: href,
          });

          return notification.save();
        } else {
          const notificationData = {
            notificationTitle: notificationTitle,
            href: href,
          };
          return Notification.create({
            emailId: emailId,
            blogs: [notificationData],
          });
        }
      })
      .then((uNotification) => {
        res.json(uNotification);
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const getNotification = asyncHandler(async (req, res) => {
  const emailId = req.query.emailId;
  try {
    Notification.findOne({ emailId: emailId }).then((notification) =>
      res.json(notification)
    );
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});
const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId, emailId } = req.body;
  try {
    let notification = await Notification.findOne({ emailId: emailId });
    notification.notifications.splice(notificationId + 1, 1);
    notification.save();
    res
      .status(200)
      .json({ success: true, message: "Notifications updated successfully" });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
module.exports = { createNotification, deleteNotification, getNotification };
