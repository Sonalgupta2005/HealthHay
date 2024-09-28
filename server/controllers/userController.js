const User = require("../models/userModel");
const wrapAsync=require("../utils/wrapAsync");
const generateToken = require("../Config/generateToken");

module.exports.login = wrapAsync(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All necessary input fields have not been filled" });
      return;
    }
  
    const user = await User.findOne({ email });
  
    console.log("fetched user Data", user);
    console.log(await user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
      const response = {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      };
      console.log(response);
      res.json(response);
    } else {
      res.status(401).json({message: "Invalid UserName or Password"});
    }
  });
  
  // Registration
  module.exports.signup = wrapAsync(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
  
    // check for all fields
    if (!username || !email || !password) {
      res.status(400).json({message:"All necessary input fields have not been filled"});
      return;
    }
    
    // pre-existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
     res.status(405).json({ message: "User already Exists" });
     return;
    }
  
    // userName already Taken
    const userNameExist = await User.findOne({ username });
    if (userNameExist) {
      res.status(406).json({ message: "UserName already taken" });
        return;
    }
  
    // create an entry in the db
    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({message:"Registration Error"});
    }
  });