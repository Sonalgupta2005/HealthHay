const productController=require("../controllers/productController.js");
const express=require("express");
const Router=express.Router();
const multer  = require('multer')
const {storage}=require("../config/cloudConfig.js");
const upload = multer({storage });
const {protect, isOwner}=require("../middlewares/authMiddleware.js")

Router.post("/products",protect,upload.single("image"),productController.createProduct);
Router.get('/products',productController.getProduct);
Router.get("/products/:id",productController.showProduct);
Router.delete("/products/:id",productController.destroyProduct);

module.exports=Router;