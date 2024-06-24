const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes.js");
const slideRoutes = require("./routes/slideRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");
const galleryRoutes = require("./routes/galleryRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes");
const colorRoutes = require("./routes/colorRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors");
const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["*"],
  exposedHeaders: ["*"],
};

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });
app.options("*", cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow GET, POST, and OPTIONS requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Allow specific headers
  next();
});

app.use(cors(corsOpts));
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/slides", slideRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/color", colorRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
