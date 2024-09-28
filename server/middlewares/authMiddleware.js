const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../models/productModel");
require('dotenv').config();

const protect = wrapAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        message:"Not authorized, token failed"
      });
    }
  }

  if (!token) {
    res.status(401).json({
        message:"Not authorized, token failed"})
  }
});

module.exports = { protect };

module.exports.isOwner=async(req,res,next)=>{
  try {
    let { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(product.owner)
    if (product.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not the owner of this product!" });
    }

    next();
  } catch (error) {
    console.error("Error checking ownership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
  }