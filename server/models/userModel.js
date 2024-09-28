const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt=require("bcryptjs");

const userSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    added_products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    password:{type:String,required:true}

});
    userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

module.exports = mongoose.model('User', userSchema);

