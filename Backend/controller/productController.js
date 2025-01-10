const OrderModel = require("../model/OrderModel");
const Product = require("../model/ProductModel");
require("dotenv").config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
    });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCategories = async (req, res) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys'];
  // console.log(categories)
  res.json(categories);
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const paymentCheckOut = async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Request body:", req.body);
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd", // You can change the currency if needed
        product_data: {
          name: item.name,
          images: [`http://localhost:5000/uploads/${item.image}`], // Adjust for the product image URL if available
        },
        unit_amount: item.price * 100, // Stripe accepts the price in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success?status=success", // Redirect after successful payment
      cancel_url: "http://localhost:3000/payment-failed?status=cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your payment." });
  }
};

const orderCreated = async (req, res) => {
  try {
    const {
      buyerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerAddress,
      items,
      totalAmount,
      orderDate,
    } = req.body;

    try {
      // Validate that the product exists in the database
      const productIds = items.map((item) => item.productId);
      const products = await Product.find({ _id: { $in: productIds } });

      if (products.length !== items.length) {
        return res
          .status(400)
          .json({ message: "One or more products not found" });
      }

      // Create the order
      const newOrder = new OrderModel({
        buyerId,
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddress,
        items,
        totalAmount,
        orderDate,
      });

      // Save the order
      await newOrder.save();
      res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your Order." });
  }
};

const OrderLists = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await OrderModel.find(); // Retrieves all orders

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Respond with the list of orders
    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  paymentCheckOut,
  orderCreated,
  OrderLists,
  getCategories
};
