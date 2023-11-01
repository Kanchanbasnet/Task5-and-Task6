const express = require('express');
const {getOrderById, checkout,getOrder}= require('../modules/Order/Order.Controller');

const orderRouter = express.Router();



orderRouter.post('/checkout/:cartId',checkout);
orderRouter.get('/',getOrder);
orderRouter.get('/:orderId',getOrderById);

module.exports = orderRouter;