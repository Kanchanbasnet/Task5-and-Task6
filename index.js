const express = require('express');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = 3000;
const userRouter = require('../node-app/routes/user.js');
const multer = require('multer')
const productRouter = require('../node-app/routes/product.js');
const storeRouter = require('../node-app/routes/store.js');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const DB_CONNECT = process.env.DB_CONNECT;
mongoose.connect(DB_CONNECT)
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`The server is running on https://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Could not connect to the database:", err); 
    });

app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/store',storeRouter);


