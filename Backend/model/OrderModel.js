// models/Order.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  buyerEmail: {
    type: String,
    required: true
  },
  buyerPhone: {
    type: String,
    required: true
  },
  buyerAddress:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"], 
    default: "Pending", 
  },
  items: [itemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
