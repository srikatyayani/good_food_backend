const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRouter.js");
const firmRoutes = require("./routes/firmRouter.js");
const productRoutes = require("./routes/productRouter.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

dotenv.config(); //using this we can access the .env file
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Not Connected"));

//middleware
app.use(bodyParser.json()); //input data is parsed into the json format
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads")); //for images

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h3>Welcome to Good Food App</h3>");
});

app.listen(PORT, (req, res) => {
  console.log(`Server started and running at ${PORT}`);
});
