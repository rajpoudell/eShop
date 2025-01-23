import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineAppstore,
  AiOutlineUsergroupAdd,
  AiOutlineFileText,
  AiOutlineSetting ,
} from "react-icons/ai";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "admin/dashboard", icon: <AiFillHome /> },
    { name: "Profile", path: "/profile", icon: <AiOutlineUser /> },
    {
      name: "Order List",
      path: "/admin/orderlist",
      icon: <AiOutlineShoppingCart />,
    },
    {
      name: "Add Product",
      path: "/admin/addproduct",
      icon: <AiOutlinePlusCircle />,
    },
    { name: "My Product", path: "/admin/myproduct", icon: <AiOutlineAppstore /> },
    { name: "Manage Users", path: "#", icon: <AiOutlineUsergroupAdd /> },
    { name: "Manage Order", path: "/admin/manageorder", icon: <AiOutlineAppstore /> },
    { name: "Setting", path: "/admin/setting", icon: <AiOutlineSetting  /> },
    { name: "Reports", path: "#", icon: <AiOutlineFileText /> },
  ];
  return (
    <div className="fixed  top-24 left-0 bg-slate-200 rounded-md w-10 sm:w-52 h-screen flex flex-col shadow-lg">
      <h2 className="mx-auto text-center mb-3 leading-[3.5rem]  font-bold tracking-wider text-2xl sm:block hidden">
        Dashboard
      </h2>
      <hr />
      <nav className="flex flex-col space-y-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path; // Check if the current path matches
          return (
            <Link
              key={index}
              to={item.path}
              className={`${
                isActive ? "bg-slate-500" : "black"
              } text-lg  hover:bg-slate-500 py-2 px-4  rounded-md flex items-center space-x-3 transition duration-300`}
            >
              <div className="sm:text-lg text-base">{item.icon}</div>
              <span className="hidden sm:block">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
};

export default Sidebar;
