const asyncHandler = require("express-async-handler");

const Color = require("../models/colorModel.js");
const User = require("../models/userModel.js");

const createColor = asyncHandler(async (req, res) => {
  const { emailId, navBar, navBarText, navBarHover, footer, heading, para } =
    req.body;
  if (!navBar || !navBarText || !navBarHover || !footer || !heading || !para) {
    res.status(400).send("Enter all the Fields");
  }

  try {
    await Color.findOne({ emailId: emailId })
      .then(async (color) => {
        if (color) {
          console.log(color);
          color.navBar = navBar;
          color.navBarText = navBarText;
          color.navBarHover = navBarHover;
          color.footer = footer;
          color.heading = heading;
          color.para = para;
          await color.save();
          return color;
        } else {
          const colorData = {
            emailId: emailId,
            navBar: navBar,
            navBarText: navBarText,
            navBarHover: navBarHover,
            footer: footer,
            heading: heading,
            para: para,
          };
          return Color.create(colorData);
        }
      })
      .then((uColor) => {
        res.json(uColor);
      });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    throw new Error(err.message);
  }
});
const fetchData = async () => {
  console.log(user);
  try {
    const response = await axios.get(
      "https://cms-backend-ne7x.onrender.com/api/about",
      {
        params: { url: user.url },
      }
    );
    const { data } = response;
    if (data) {
      setContent(data.aboutContent); // Set content to the data's aboutContent
      setContactNumber(data.contactNumber);
      setAddress(data.address);
      setEmail(data.email);
      setLogoImage(data.logoid); // Set the image URL
      setImage(data.logoid); // Display the fetched image
      setMapURL(data.mapURL); // Set the map URL
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Error fetching data");
  }
};

const getColor = asyncHandler(async (req, res) => {
  const { url } = req.query;
  const user = await User.findOne({ url: url });
  const email = user.email;
  try {
    Color.findOne({ emailId: email }).then((color) => res.json(color));
  } catch (err) {
    console.log(err);
  }
});

module.exports = { createColor, getColor };
