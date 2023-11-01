const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({
    storeName:{
        type:String,
        required:true,
    },
    logo:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    storeType:{
        type:String,
        enum: ['Electronics','Grocery','Clothing','Stationery' ],
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    location:{
        type:{
            type:String,
            index: '2dsphere',
            enum :['Point'],
            default:'Point' },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        

    }],
},{timestamps:true}
)
// storeSchema.index({location:'2dsphere'});

module.exports = mongoose.model('Store', storeSchema );