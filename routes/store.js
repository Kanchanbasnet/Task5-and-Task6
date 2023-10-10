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



storeRouter.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), createStore);
storeRouter.get('/',getStore);
storeRouter.post('/findNearestStore',findStore);
module.exports = storeRouter;

