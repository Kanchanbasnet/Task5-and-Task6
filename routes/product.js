const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct,updateQuantity,outOfStock} = require('../modules/Products/Product.Controller.js');
const productRouter = express.Router();
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/multerconfig');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: integer
 *         description:
 *           type: string
 *         quantity:
 *           type: integer
 *         productType:
 *           type: string
 *         image:
 *           type: string
 *       example:
 *         productId: "65d34"
 *         name: "Laptop"
 *         price: 999
 *         description: "A high-end Latest Laptop of Nepal."
 *         quantity: 4
 *         productType: "Electronics"
 *         image: "user123.jpg"
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided information and an optional image upload.
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               productType:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */
productRouter.post('/create', upload.single('image'), createProduct);
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with their details.
 *     description: Retrieve a list of all Products from the MongoDB.
 *     responses:
 *       200:
 *         description: Successful response with Products details.
 */
productRouter.get('/', getProducts);
/**
 * @swagger
 * /products/outOfStock:
 *   get:
 *     summary: Get products that are out of stock.
 *     description: Retrieve a list of products that are out of stock.
 *     responses:
 *       200:
 *         description: Successful response with out-of-stock products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.get('/outOfStock', outOfStock);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a product by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
productRouter.get('/:id', getProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing Product by ID with File Upload
 *     description: Update an existing Product with the provided information and optional file upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               productType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */
productRouter.put('/:id', updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Delete a product by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product is deleted Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
productRouter.delete('/:id', deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update an existing Product's quantity by ID
 *     description: Update the quantity of an existing product with the provided quantity value.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:   
 *           schema:
 *             type: object
 *             properties:
 *               quantity:   
 *                 type: integer
 *                 description: The new quantity value for the product.
 *     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */
productRouter.patch('/:id', updateQuantity);



module.exports = productRouter;
