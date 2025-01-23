const OrderModel = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const nodemailer = require("nodemailer");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kingsniper202030@gmail.com",
    pass: process.env.PASSWORD,
  },
});

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
    const { name, price, description, category, stock, UserId,_id    } = req.body;
    const image = req.file ? req.file.filename : null;
    let product;
    if (_id ) {
      product = await Product.findByIdAndUpdate(
        _id,
        { UserId, name, price, description, image, category, stock },
        { new: true, runValidators: true }
      );
      res.status(201).json({ message: "Product Updated successfully", product });
    } else {
       product = new Product({
        UserId,
        name,
        price,
        description,
        category,
        stock,
        image,
      });
      await product.save();
      res.status(201).json({ message: "Product added successfully", product });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
  ];
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
          images: [`http://localhost:5000/uploads/${item.image}`],
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
      buyerGuest,
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

      // Send Email
      const mailOptions = {
        from: "kingsniper202030@gmail.com",
        to: buyerEmail,
        subject: "Your Order Confirmation",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Thank You for Your Order, ${buyerName}!</h2>
          
          <p style="font-size: 16px; color: #555;">We appreciate your business. Below are the details of your order:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f4f4f4;">Order Date:</td>
              <td style="padding: 8px;">${new Date(
                orderDate
              ).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background-color: #f4f4f4;">Total Amount:</td>
              <td style="padding: 8px; color: #E74C3C;"><strong>$${totalAmount}</strong></td>
            </tr>
          </table>
    
          <h3 style="margin-top: 20px; border-bottom: 2px solid #333; padding-bottom: 5px;">Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left; background-color: #f8f8f8;">Product</th>
              <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left; background-color: #f8f8f8;">Price</th>
              <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left; background-color: #f8f8f8;">Quantity</th>
            </tr>
            ${items
              .map(
                (item) =>
                  `<tr>
                    <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.name}</td>
                    <td style="border-bottom: 1px solid #ddd; padding: 8px;">$${item.price}</td>
                    <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  </tr>`
              )
              .join("")}
          </table>
    
          <p style="margin-top: 20px; font-size: 14px; color: #666;">If you have any questions, feel free to <a href="mailto:support@eShop.com" style="color: #3498db;">contact us</a>.</p>
          
          <p style="text-align: center; font-size: 14px; color: #777;">&copy; 2025 eShop Store. All Rights Reserved.</p>
        </div>
      `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email send error:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email send error:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      });
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // Check if the order exists
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with the updated order
    res
      .status(200)
      .json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const myProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ UserId: userId });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for this user" });
    }

    // Respond with the list of products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMyProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.body.productId; // Get product ID from the body

    const product = await Product.findOneAndDelete({
      _id: productId,
      UserId: userId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not owned by the user" });
    }

    // Respond with the list of products
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error fetching products:", error);
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
  getCategories,
  updateOrderStatus,
  myProduct,
  deleteMyProduct,
};
