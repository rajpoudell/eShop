import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import  { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PaymentStatus from "./components/PaymentStatus";
import OrderList from "./Pages For Admin/OrderList";
import AddProduct from "./Pages For Admin/AddProduct";

function App() {
  return (
    <div  className="bg-slate-200">
      <Router>
        {" "}
        {/* Use BrowserRouter here, no need for another Router inside */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/payment-success" element={<PaymentStatus/>} />
          <Route path="/payment-failed" element={<PaymentStatus/>} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
      <Toaster />

    </div>
  );
}

export default App;
