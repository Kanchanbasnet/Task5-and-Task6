const express = require('express');
const storeRouter = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { createStore,getStore,findStore } = require('../modules/Store/Store.Controller');

storeRouter.use(bodyParser.json());
storeRouter.use(bodyParser.urlencoded({ extended: true }));


storeRouter.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/storeImages'));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *      name: Stores
 *      description: Operations regarding Stores.
 */




storeRouter.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), createStore);
/**
 * @swagger
 * /store/create:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               storeName:
 *                 type: string
 *               logo:
 *                 type: file
 *               image:
 *                 type: file
 *               storeType:
 *                 type: string
 *                 enum: ['Electronics', 'Grocery', 'Clothing', 'Stationery']
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       "201":
 *         description: Store created Successfully.
 *       "400":
 *         description: Store already exists.
 *       "500":
 *         description: Internal Server Error.
 */
storeRouter.get('/',getStore);
/**
 * @swagger
 * /store:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       "200":
 *         description: A list of all stores.
 *       "404":
 *         description: No stores found.
 *       "500":
 *         description: Internal Server Error.
 */
storeRouter.post('/findNearestStore',findStore);
/**
 * @swagger
 * /store/findNearestStore:
 *   post:
 *     summary: Find the nearest stores
 *     tags: [Stores]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       "200":
 *         description: Nearest stores found successfully.
 *       "404":
 *         description: No stores found.
 *       "500":
 *         description: Internal Server Error.
 */
module.exports = storeRouter;

