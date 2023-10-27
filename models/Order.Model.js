const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
      
    }
    
  ],
  price: {
    type: Number,
     required:true
  }
 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);