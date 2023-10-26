const express = require('express');
const {getOrderById, checkout,getOrder}= require('../modules/Order/Order.Controller');

const orderRouter = express.Router();

orderRouter.post('/checkout/:cartId',checkout);


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders from the MongoDB.
 *     responses:
 *       200:
 *         description: Successful response with order details.
 */
orderRouter.get('/',getOrder);
orderRouter.get('/:orderId',getOrderById);




module.exports = orderRouter;