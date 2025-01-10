import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const cartLength = useSelector((state) => state.cart.cartLength || 0);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800 text-white p-4  ">
      <div className="container  mx-auto flex justify-between items-center  ">
        <Link to="/" className="text-lg font-bold">
          eShop
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/cart" className="hover:text-gray-400 relative">
            Cart{" "}
            <small className="absolute bottom-3 left-7 text-teal-300">
              {cartLength}
            </small>
          </Link>
          {userInfo ? (
            <Link
              to="#"
              onClick={() => dispatch(logout())}
              className="hover:text-gray-400"
            >
              Logout
            </Link>
          ) : (
            <>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
          <Link to="/register" className="hover:text-gray-400">
            Register
          </Link>
            </>
          )}

          <Link to="/admin/orderlist" className="hover:text-gray-400">
            List of Order
          </Link>
          <Link to="/admin/addproduct" className="hover:text-gray-400">
            Add Product
          </Link>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
