const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); //using this we can access the .env file
const SECRET_KEY = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token; //token is passed to the headers
  if (!token) {
    return res.send(401).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(403).json({ error: "Vendor not found" });
    }
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
