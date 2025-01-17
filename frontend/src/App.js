import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import CustomerServicePage from "./pages/public fold/CustomerServicePage";
import { useSelector } from "react-redux";

function App() {
  const cartLength = useSelector((state) => state.cart.cartLength || 0);
  const userInfo = useSelector((state) => state.user.userInfo);
 

 
  return (
    <div className="bg-slate-200">
      <Router>
        <Navbar
          userInfo={userInfo}
          cartLength={cartLength}
        />
        ;{" "}
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/payment-success" element={<PaymentStatus />} />
          <Route path="/payment-failed" element={<PaymentStatus />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />

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
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
