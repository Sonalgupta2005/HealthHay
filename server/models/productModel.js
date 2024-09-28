const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const productSchema=mongoose.Schema({
    pname:{type:String,required:true},
    pdesc:{type:String,required:true},
    image:{
        url:String,
        filename:String
    },
    price:{type:Number,required:true},
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
      }],
    product_link:{type:String},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{type:String,
        enum:["Seeds","Fertilizers","Equipments","Pesticides","Herbicides","PGR","Others"],
        required:true
    }
})
const Product=mongoose.model("Product",productSchema);
module.exports=Product;