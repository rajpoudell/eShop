const bcrypt = require("bcryptjs");

const OrderModel = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const RegisterUser = async (req, res) => {
  const { name, email, phone, address, password, isAdmin } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        token: "",
        phone,
        address,
      });
      const token = generateToken(newUser._id);
      newUser.token = token;
      await newUser.save();
      console.log(newUser);

      res
        .status(201)
        .json({ success: true, message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      user.token = token;   
      console.log(user)   
      await user.save();
      res.json({
        id: user._id,
        token: user.token,
        message:"User login successfully",
        isAdmin:user.isAdmin,
        name:user.name,
        user:user
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  RegisterUser,
  Login,
};
