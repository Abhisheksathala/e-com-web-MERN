import express from "express"; // Import the express framework
import cors from "cors"; // Import the CORS middleware
import "dotenv/config"; // Import and configure dotenv to load environment variables
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import the fs module for file system operations
// Importing custom modules
import connectDb from "./src/Db/indexDb.js"; // Import the connectDb function
import upload from "./src/Multer/Multer.js"; // Importing multer upload configuration
// Resolve __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { UserRoute } from "./src/Routes/UserRoute.js";
import NewcollctionRoute from "./src/Routes/NewcollctionRoute.js";
import CartRout from "./src/Routes/AddtocartRoute.js";

const app = express(); // Create an instance of the express application

// Middleware setup
app.use(cors());

app.use(express.json()); // Parse JSON requests

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/images", express.static(path.join(__dirname, "upload/images"))); // Serve static files from the upload/images directory
// API to upload
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: 0,
      message: "No file uploaded",
    });
  }
  res.status(200).json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

import productRouter from "./src/Routes/ProductRoute.js";
//api end points
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/newproducts", NewcollctionRoute);
app.use("/api/v1/cart", CartRout);

// Database connection setup
connectDb()
  .then(() => {
    // If the database connection is successful
    app.get("/", (req, res) => {
      res.send("hello world"); // Define a route for the root URL
    });

    app.listen(process.env.PORT, (error) => {
      if (error) console.log("app is not runing :", error);
      console.log(
        `Server is running on port ${process.env.PORT}`,
        process.env.MONGODB_URI
      ); // Start the server and log the message
    });
  })
  .catch((err) => {
    // If the database connection fails
    console.error("MongoDB connection failed:", err); // Log the error message
    process.exit(1); // Exit the process if the MongoDB connection fails
  });
