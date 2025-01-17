import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useState } from "react";

const Navbar = ({ userInfo, cartLength }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-bold">
            eShop
          </Link>
          <div className="flex items-center space-x-6 md:space-x-10 relative">
            {/* Hamburger Menu Icon for Mobile */}
            <button
              className="md:hidden  text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Links */}
            <div
              className={`${
                isMenuOpen ? "flex flex-col absolute top-16 text-black w-full h-ful  right-6 gap-4" : "hidden"
              } md:flex  transition-all space-x-6 items-center`}
            >
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
                      <Link
                        to="/admin/orderlist"
                        className="hover:text-gray-400"
                      >
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
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
