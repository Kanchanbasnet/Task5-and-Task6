
const express = require('express');
const { createUser, getUsers, getById, updateUser, deleteUser, userLogin, registerUser } = require('../modules/User/User.Controller');
const userRouter = express.Router();

const upload = require('../middleware/multerconfig');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         image:
 *           type: file
 *       example:
 *         id: "65d34"
 *         name: "John Doe"
 *         username: "johndoe"
 *         password: "********"
 *         email: "john.doe@example.com"
 *         image: "user123.jpg"
 */

/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the MongoDB.
 *     responses:
 *       200:
 *         description: Successful response with user details.
 */
userRouter.get('/getAllUsers', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', getById);


/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new User
 *     description: Create a new user with the provided information and an optional image upload.
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: file
 *           required: [name, username, password, email]
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */

userRouter.post('/create', upload.single('image'), createUser);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login with username and password
 *     description: Authenticate a user by providing their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: your_username
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: your_password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '400':
 *         description: Bad request. Check your input data.
 *       '500':
 *         description: Internal Server Error.
 */



userRouter.post('/login', userLogin);
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update an existing User by ID with File Upload
 *     description: Update an existing user with the provided information and optional file upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: file
 *           required: []
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Check your input data.
 *       500:
 *         description: Internal Server Error.
 */


userRouter.patch('/:id', upload.single('image'), updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User is deleted Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.delete('/:id', deleteUser);
userRouter.post('/auth/register', registerUser);



module.exports = userRouter;