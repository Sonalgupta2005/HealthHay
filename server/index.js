const express=require("express");
const app=express();
const path = require('path');
const dotenv=require("dotenv");
const mongoose = require("mongoose");
const userRoutes=require("./Routes/userRoute.js");
const productRoutes=require("./Routes/productRoute.js");
const cors=require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

app.use(cors({
  origin:"*"
}));

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const mongo_url=process.env.MONGO_URL;
const connectDb = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
  }
};
connectDb(); 

app.use("/user",userRoutes);
app.use("/",productRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("App is listening...")
})