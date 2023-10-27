const express = require('express');
const {getOrderById, checkout,getOrder}= require('../modules/Order/Order.Controller');

const orderRouter = express.Router();


/**
 * @swagger
 * /orders/checkout/{id}:
 *      post:
 *          summary: Check out a cart.
 *          description: Checkout a user's cart and generate order only when the minimum order is greater than Rs.500.
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Id of the Cart.
 *              schema:
 *                  type: string
 *      responses:
 *          200: 
 *              description: Order Generated Successfully.
 *          400:
 *              description: Minimum Order for checkout is Rs. 500.
 *          500:
 *              description: Internal Server Error. 
 */

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

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get an order by ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order.
 *     responses:
 *       "200":
 *         description: Order of the user retrieved Successfully.
 *       "404":
 *         description: Order not found.
 *       "500":
 *         description: Internal Server Error.
 */

orderRouter.get('/:orderId',getOrderById);




module.exports = orderRouter;