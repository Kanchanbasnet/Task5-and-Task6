const express = require('express');
const cartRouter = express.Router();
const {addToCart, getAllCart, getOne} = require('../modules/Cart/Cart.Controller');

cartRouter.post('/addToCart',addToCart);
cartRouter.get('/',getAllCart)
cartRouter.get('/:id',getOne);




module.exports = cartRouter;
