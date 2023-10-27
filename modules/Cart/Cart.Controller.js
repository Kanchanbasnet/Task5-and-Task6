const Cart = require("../../models/Cart.Model.js");
const Product = require("../../models/Product.Model.js");

// exports.addToCart = async (req, res) => {
//   try {
//     const { items, userId } = req.body;
//     let totalPrice = 0; 

//     const existingCart = await Cart.findOne({ userId });
//     if (existingCart) {
//       let updatedItems =[...existingCart.items] ;

//       for (const newItem of items) {
//         const itemExist = updatedItems.find((item) => item.productId == newItem.productId);

//         if (itemExist) {
//           itemExist.quantity += newItem.quantity;
//         } else {
//           updatedItems.push(newItem);
//         }
        
        
//         const productExist = await Product.findById(newItem.productId);
//         if (!productExist) {
//           return res.status(404).send({ error: "Product does not exist!" });
//         }
//         totalPrice += newItem.quantity * productExist.price; 
//       }

//       await Cart.updateOne(
//         { userId },
//         {
//           $set: {
//             items: updatedItems,
//             price: totalPrice.toFixed(2),
//           },
//         }
//       );
//       res.status(200).send("Cart Updated Successfully.");
//     } else {
//       for (let item of items) {
//         const productExist = await Product.findById(item.productId);
//         if (!productExist) {
//           return res.status(404).send({ error: "Product does not exist!" });
//         }
//         totalPrice += item.quantity * productExist.price; 
//       }
//       const cartItems = {
//         userId,
//         items,
//         price: totalPrice.toFixed(2),
//       };
//       await Cart.create(cartItems);
//       res.status(200).send({ message: "Cart created Successfully." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// }
exports.addToCart = async (req, res) => {
  const { userId, items } = req.body;

  
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      let updatedItems = [...existingCart.items];

      for (const newItem of items) {
        const existingItem = updatedItems.find(
          (item) => item.productId == newItem.productId
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          updatedItems.push(newItem);
        }
      }

      let totalPrice = 0; 
      for (const item of updatedItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        totalPrice += product.price * item.quantity;
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

      res.status(200).json({ success: "Cart updated successfully" });
    } else {
      let totalPrice = 0;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        totalPrice += product.price * item.quantity;
      }
      const cartData = {
        userId,
        items,
        price: totalPrice.toFixed(2),
      };
      const cartCreated = await Cart.create(cartData);
      res.status(200).json({ success: "Cart created successfully", cartCreated});
    }
  
    

  }

  exports.getAllCart = async (req,res)=>{
    try{
      const cart = await Cart.find({}).populate('userId').populate('items.productId');
      if(!cart){
        return res.status(404).send("Cart does not exist.");
      }
      else{
        return res.status(200).send(cart);
      }
  
  
    }
    catch(error){
      console.log(error);
      res.status(500).send({message:"Could not get all the Cart."})
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
  
  