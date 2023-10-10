const Product = require('../../models/Product.Model');



exports.getProducts = async (req,res)=>{
    try{
        const products = await Product.find();
        if(!products){
            return res.status(404).send("Product does not exists");
        }
        return res.status(200).send(products);

    }
    catch(error){
        console.error(`Internal Server Error.`);
        res.send("Internal servr error.");

    }
}
exports.outOfStock= async (req,res)=>{
    try{
        const outOfStock = await Product.find({quantity:{$lt:5}});
        return res.status(400).send(outOfStock);

    }
    catch(error){
        res.send(error);
    }
}
exports.getProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await Product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product Exist.');
        }
        return res.status(200).send(productExist);
    }
    catch(error){
        res.send(error);
    }

}



exports.createProduct = async (req, res) => {
  try {
    const product = new Product({ // Use the Product model
      productName: req.body.productName,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      productType: req.body.productType,
      image: req.file.filename,
    });

    // Check if a product with the same ID exists (assuming you meant to check for ID uniqueness)
    const productId = req.params.id;
    const productExist = await Product.findOne({ _id: productId });

    if (!productExist) {
      const newProduct = await product.save();
      return res.status(200).send({ data: newProduct, message: "Product Created Successfully." });
    } else {
      return res.send('Product exists.');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};






    
exports.updateProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.')
        }
        const updateProduct= await product.findByIdAndUpdate(id, req.body, {new:true});
        return res.status(200).send(updateProduct);

    }
    catch(error){
        
        res.send(error);


    }
}
exports.updateQuantity= async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.');
        }
        const updateQuantity = {quantity: req.body.quantity || product.quantity};
        const updatedQuantity = await product.findByIdAndUpdate(id, updateQuantity, {new:true});
        return res.status(200).send(updatedQuantity);

    }
    catch(error){
        
        res.send(error);
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await Product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.')
        }
        await product.findByIdAndDelete(id);
        res.status(404).send("Product Deleted Successfully.");
    }
    catch(error){
        
        res.send(error);
    }
}