const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct,updateQuantity,outOfStock} = require('../modules/Products/Product.Controller.js');
const productRouter = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage });




productRouter.post('/create', upload.single('image'), createProduct);
productRouter.get('/', getProducts);
productRouter.get('/outOfStock', outOfStock);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.patch('/:id', updateQuantity);



module.exports = productRouter;
