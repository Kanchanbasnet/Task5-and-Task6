const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        
        unique:true
    },
    password:{
        type:String,
        
    },
    name:{
        type:String,
        
    },
    email:{
        type:String,
    },
    
    address:{
        type:String,
       
    },
    image:{
        type:String,
        
    },
    
    
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema);