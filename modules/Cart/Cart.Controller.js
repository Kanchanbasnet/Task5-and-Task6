const Cart = require("../../models/Cart.Model.js");
const Product = require("../../models/Product.Model.js");

exports.addToCart = async (req, res) => {
  try {
    const { items, userId } = req.body;
    let totalPrice = 0; 

    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      let updatedItems = existingCart.items.slice();

      for (const newItem of items) {
        const itemExist = updatedItems.find((item) => item.productId == newItem.productId);

        if (itemExist) {
          itemExist.quantity += newItem.quantity;
        } else {
          updatedItems.push(newItem);
        }
      }

      for (const item of updatedItems) {
        const productExist = await Product.findById(item.productId);
        if (!productExist) {
          return res.status(404).send({ error: "Product does not exist!" });
        }
        totalPrice += item.quantity * productExist.price; 
      }

      await Cart.updateOne(
        { userId },
        {
          $set: {
            items: updatedItems,
            price: totalPrice.toFixed(2),
          },
        }
      );
      res.status(200).send("Cart Updated Successfully.");
    } else {
      for (let item of items) {
        const productExist = await Product.findById(item.productId);
        if (!productExist) {
          return res.status(404).send({ error: "Product does not exist!" });
        }
        totalPrice += item.quantity * productExist.price; 
      }
      const cartItems = {
        userId,
        items,
        price: totalPrice.toFixed(2),
      };
      await Cart.create(cartItems);
      res.status(200).send({ message: "Cart created Successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Could not add items to the cart.");
  }
}


  exports.getAllCart = async (req,res)=>{
    try{
      const carts = await Cart.find({}).populate('userId').populate('items.productId');
      if(!carts){
        return res.status(404).send("Cart does not exist.");
      }
      else{
        return res.status(200).send(carts);
      }
  
  
    }
    catch(error){
      console.log(error);
      res.status(500).send({message:"Could not get all the Carts."})
    }
  }

  exports.getOne = async (req,res)=>{
    try{
       const cartId = req.params.id;
       const cart = await Cart.findById(cartId)
       if(!cart){
        return res.status(404).send("Cart does not exist.");
       }
       return res.status(200).json(cart);
  
  
  
  
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error.")
    }
  }
  
  