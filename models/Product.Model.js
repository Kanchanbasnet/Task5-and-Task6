const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type:String,
        
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
        type:String,
        enum: ['Electronics','Grocery','Clothing','Stationery' ],
        required:true,
    },
    image:{
        type:String,
        
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',

    }
}, 
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);