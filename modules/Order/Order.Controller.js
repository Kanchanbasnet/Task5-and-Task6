const User = require("../../models/User.Model.js");
const Cart = require("../../models/Cart.Model.js");
const Product = require("../../models/Product.Model.js");
const Order = require("../../models/Order.Model.js");
const transporter = require('../../mjml/mail.js');
const mjml2html = require("mjml");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');



exports.checkout = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExist = await Cart.findById(cartId).populate('userId').populate('items.productId');

    if (!cartExist) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    if (cartExist.price >= 500) {
      const newOrder = {
        cartId,
        userId: cartExist.userId,
        items: cartExist.items,
        price: cartExist.price,
      };

      await Cart.findByIdAndRemove(cartId);
      const added = await Order.create(newOrder);
      // const mjmlTemplate = fs.readFileSync('../../mjml/userInvoice.mjml', 'utf-8');
      const mjmlTemplate = fs.readFileSync(path.resolve(__dirname, '../../mjml/userInvoice.mjml'), 'utf8')
      const templateVars = {
        cartExist, // Your cartExist object
      };
  
      // Render MJML template using EJS
      const renderedMJML = ejs.render(mjmlTemplate, templateVars);
  
      // Convert the rendered MJML template to HTML using mjml package
      const { html } = mjml2html(renderedMJML);
      const info = await transporter.sendMail({
        from: `"Kanchan Store" <dimitri.gleason@ethereal.email>`,
        to: cartExist.userId.email,
        subject: "Your Invoice",
        html: html
      })

     

      res.json({ cartExist, success: 'Order Generated Successfully' });
    } else {
      res.status(400).json({ message: 'Minimum order to checkout is Rs.500' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "The order cannot be generated." });
  }
};



exports.getOrder = async (req,res) =>{
  try{
      const orders = await Order.find({}).populate('userId').populate('items.productId')
      if(orders.length === 0){
          return res.status(200).send('You have no orders');

      }
      return res.status(200).json(orders);
  }
  catch(error){
      console.log(error);
      res.status(500).send('Internal Server Error.');
  }
  }
  
  exports.getOrderById = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const getOrder = await Order.findById(orderId);
  
      if (!getOrder) {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      res.status(200).json(getOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  


































