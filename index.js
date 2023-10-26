const express = require('express');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = 3000;
const userRouter = require('../node-app/routes/user.js');
const productRouter = require('../node-app/routes/product.js');
const storeRouter = require('../node-app/routes/store.js');
const orderRouter = require('../node-app/routes/order.js');
const cartRouter = require('../node-app/routes/cart.js');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');



const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

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

const options ={
    definition:{
     openapi:"3.0.0",
     info:{
        title:"Ecommerce API",
        version:"1.0.0",
        description:"This is the REST API application made with express. It is a simple Express Ecommerce API."

     },
     servers:[{
        url:"http://localhost:3000"
     }]
    },
    apis:['../node-app/routes/*.js']  
}
const specs = swaggerJsDoc(options);



app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/store',storeRouter);
app.use('/orders', orderRouter);
app.use('/cart',cartRouter);
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs))





