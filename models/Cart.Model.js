const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number
      }
    }
  ],
 
}, { timestamps: true });

module.exports = mongoose.model('cart', cartSchema);