const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      // required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String }, // URL or filename
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Beauty",
        "Sports",
        "Toys",
      ],
    },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
