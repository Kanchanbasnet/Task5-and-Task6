const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type:String,
        required:true,
    },

    price:{
        type: Number,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    productType:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',

    }
}, 
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);