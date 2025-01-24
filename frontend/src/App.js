import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import "./index.css";

import CustomerServicePage from "./pages/public fold/CustomerServicePage";
import PaymentStatus from "./components/PaymentStatus";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

import OrderList from "./pages/Admins/OrderList";
import AddProduct from "./pages/Admins/AddProduct";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Dashboard from "./pages/Admins/Dashboard";
import Sidebar from "./pages/Admins/Sidebar";
import Setting from "./pages/Admins/Setting";
import ManageOrder from "./pages/Admins/ManageOrder";
import MyProduct from "./pages/Admins/MyProduct";
import TrackProduct from "./pages/TrackProduct";

function App() {
  const cartLength = useSelector((state) => state.cart.cartLength || 0);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="bg-slate-200">
      <Router>
        <Navbar userInfo={userInfo} cartLength={cartLength} />{" "}
        <div className="flex ">
          {" "}
          {userInfo?.isAdmin &&(
            <div className="">
              <Sidebar />
            </div>
          )}
          <div className={`flex-1 ${userInfo?.isAdmin ? 'ml-10 sm:ml-60' : 'ml-0 sm:ml-0'}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/payment-success" element={<PaymentStatus />} />
              <Route path="/payment-failed" element={<PaymentStatus />} />
              <Route path="/tracking" element={<TrackProduct />} />
              <Route
                path="/customer-service"
                element={<CustomerServicePage />}
              />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/orderlist" element={<OrderList />} />
                <Route path="/admin/addproduct" element={<AddProduct />} />
                <Route path="/admin/setting" element={<Setting />} />
                <Route path="/admin/manageorder" element={<ManageOrder />} />
                <Route path="/admin/myproduct" element={<MyProduct />} />
              </Route>
            </Routes>
          </div>
        </div>
          {!userInfo?.isAdmin &&(
              <Footer/>
            )}
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
