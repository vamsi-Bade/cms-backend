const asyncHandler = require("express-async-handler");

const Service = require("../models/serviceModel.js");
const User = require("../models/userModel.js");

const createService = asyncHandler(async (req, res) => {
  const { serviceTitle, serviceDesc, imageId, emailId, shortDesc } = req.body;
  if (!serviceTitle || !serviceDesc || !imageId || !shortDesc) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    Service.findOne({ emailId: req.body.emailId })
      .then((service) => {
        if (service) {
          service.services.push({
            serviceTitle: serviceTitle,
            serviceDesc: serviceDesc,
            imageId: imageId,
            shortDesc: shortDesc,
          });

          return service.save();
        } else {
          const serviceData = {
            serviceTitle: serviceTitle,
            serviceDesc: serviceDesc,
            imageId: imageId,
            shortDesc: shortDesc,
          };
          return Service.create({ emailId: emailId, services: [serviceData] });
        }
      })
      .then((uService) => {
        res.json(uService);
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const getServices = asyncHandler(async (req, res) => {
  const { url } = req.query;
  const user = await User.findOne({ url: url });
  const emailId = user.email;
  try {
    Service.findOne({ emailId: emailId }).then((service) => res.json(service));
  } catch (err) {
    console.log(err);
  }
});
const changeStatus = asyncHandler(async (req, res) => {
  try {
    const { index, emailId, status } = req.body.params;

    let service = await Service.findOne({ emailId: emailId });

    service.services.at(index).status = status;
    await service.save();
    res.json(200);
  } catch (err) {
    res.json(400);
    throw new Error(err.message);
  }
});
const deleteService = asyncHandler(async (req, res) => {
  const { serviceId, emailId } = req.body;
  try {
    let service = await Service.findOne({ emailId: emailId });
    service.services.splice(serviceId, 1);
    service.save();

    res
      .status(200)
      .json({ success: true, message: "Services updated successfully" });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { createService, getServices, deleteService, changeStatus };
