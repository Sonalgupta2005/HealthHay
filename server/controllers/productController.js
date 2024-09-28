const Product=require("../models/productModel.js");
const wrapAsync=require("../utils/wrapAsync");

module.exports.createProduct=wrapAsync(async(req,res)=>{
    let {pname,pdesc,price,product_link,category,image}=req.body;
    console.log(req.body);
    let newProduct=new Product(req.body);
    newProduct.owner=req.user;
    let url=req.file.path;
    let filename=req.file.filename;
    newProduct.image={url,filename};
    let savedProduct=await newProduct.save();
    console.log(savedProduct);
    res.json({msg:"success"});
}
)
module.exports.getProduct=wrapAsync(
    async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).send(err);
        }
    }
)

module.exports.showProduct=wrapAsync(async (req, res) => {
    try {
        let {id}=req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error' })

}
});
module.exports.destroyProduct=wrapAsync(async(req,res)=>{
    
        // Your logic to delete the product
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Product deleted successfully' });
    
  });