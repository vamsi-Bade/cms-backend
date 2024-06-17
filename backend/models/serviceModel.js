const mongoose = require("mongoose");
Schema = mongoose.Schema;
const serviceSchema = new Schema(
  {
    serviceTitle: {
      type: String,
      required: true,
    },
    serviceDesc: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Define the User schema
const servicesModel = new Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  services: [serviceSchema],
});

const Service = mongoose.model("Service", servicesModel);
module.exports = Service;
