const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name can not exceed 100 chars"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [5, "Product price can not exceed 5 chars"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  quantity: {
    type: Number,
    required: [true, "please enter product quantity"],
    maxLength: [5, "Product quantity can not exceed 5 chars"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
