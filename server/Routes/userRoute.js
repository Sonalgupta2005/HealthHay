const express=require("express");
const Router=express.Router();
const userController=require("../controllers/userController.js");

Router.post("/signup",userController.signup);
Router.post("/login",userController.login);

module.exports=Router;