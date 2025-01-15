import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const cartLength = useSelector((state) => state.cart.cartLength || 0);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-bold ">
            eShop
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            {!userInfo?.isAdmin && (
              <Link to="/cart" className="hover:text-gray-400 relative">
                Cart{" "}
                <small className="absolute bottom-3 left-7 text-teal-300">
                  {cartLength}
                </small>
              </Link>
            )}

            {userInfo ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400 bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
                <Link to="/user/profile" className="hover:text-gray-400">
                  🥷 {userInfo.name}
                </Link>
                {/* Admin-specific routes */}
                {userInfo.isAdmin && (
                  <>
                    <Link to="/admin/orderlist" className="hover:text-gray-400">
                      List of Orders
                    </Link>
                    <Link
                      to="/admin/addproduct"
                      className="hover:text-gray-400"
                    >
                      Add Product
                    </Link>
                  </>
                )}
              </>
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
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
