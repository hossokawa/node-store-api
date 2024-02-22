const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide the product name"],
  },
  price: {
    type: Number,
    required: [true, "please provide the product price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "${VALUE} is not a valid supplier",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
