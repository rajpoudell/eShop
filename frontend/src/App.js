import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PaymentStatus from "./components/PaymentStatus";
import OrderList from "./Pages For Admin/OrderList";
import AddProduct from "./Pages For Admin/AddProduct";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-slate-200">
      <Router>
        <Navbar />
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/payment-success" element={<PaymentStatus />} />
          <Route path="/payment-failed" element={<PaymentStatus />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<Profile />} /> 
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>  
            <Route path="/admin/orderlist" element={<OrderList />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
