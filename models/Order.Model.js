const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    
    ref:'User'
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        
        ref:'Product'
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);