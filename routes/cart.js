const express = require('express');
const cartRouter = express.Router();
const {addToCart, getAllCart, getOne} = require('../modules/Cart/Cart.Controller');


/**
 * @swagger
 * tags:
 *      name: Carts
 *      description: Operations regarding Carts.
 */

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: Add items to the Cart.
 *     tags: [Carts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       "200":
 *         description: "Cart updated Successfully."
 *       "404":
 *         description: "Product Does not exist."
 *       "500":
 *         description: "Internal Server Error."
 */



cartRouter.post('/addToCart',addToCart);
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all shopping carts.
 *     tags: [Carts]
 *     responses:
 *       "200":
 *         description: A list of all shopping carts.
 *       "404":
 *         description: No shopping carts found.
 *       "500":
 *         description: Internal Server Error.
 */

cartRouter.get('/',getAllCart)

/**
 * @swagger
 * /cart/{cartId}:
 *   get:
 *     summary: Get a shopping cart by ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the shopping cart.
 *     responses:
 *       "200":
 *         description: Shopping cart retrieved successfully.
 *       "404":
 *         description: Shopping cart not found.
 *       "500":
 *         description: Internal Server Error.
 */


cartRouter.get('/:id',getOne);




module.exports = cartRouter;
