const asyncHandler = require("express-async-handler");

const Service = require("../models/serviceModel.js");

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
  const emailId = req.query.emailId;
  try {
    Service.findOne({ emailId: emailId }).then((service) => res.json(service));
  } catch (err) {
    console.log(err);
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

module.exports = { createService, getServices, deleteService };
