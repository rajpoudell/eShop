import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaClipboardList } from "react-icons/fa";
import { getOrders } from "../../redux/slices/orderSlice";

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);
  const { orderItem, orderLength, shippedLength,pendingLength } = useSelector(
    (state) => state.orders
  );

  const token = `${user.token || user.user.token}`;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getOrders(token));
    }
  }, [dispatch, token]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
      Dashboard
      <div className="border-t-2 border-b-2 mt-2 p-3  flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <FaUserCircle className="text-5xl text-blue-500" />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            Hey there, {user?.name || "User"}!
          </h2>
        </div>
      </div>
    </h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
  
      {/* Orders Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaClipboardList className="text-5xl text-green-500" />
        <div>
          <h2 className="text-xl font-semibold">{orderLength || 0}</h2>
          <p className="text-gray-500">Total Orders</p>
        </div>
      </div>
  
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaClipboardList className="text-5xl text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold">{shippedLength || 0}</h2>
          <p className="text-gray-500">Shipped</p>
        </div>
      </div>
  
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaClipboardList className="text-5xl text-red-500" />
        <div>
          <h2 className="text-xl font-semibold">{pendingLength || 0}</h2>
          <p className="text-gray-500">Pending</p>
        </div>
      </div>
    </div>
  
    {/* Orders Table */}
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Recent Orders
      </h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">Order ID</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orderItem?.length > 0 ? (
            [...orderItem]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 4)
              .map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-3 px-6 text-black break-all">{order._id}</td>
                  <td className="py-3 px-6">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-6">{order.status.toString()}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td className="py-3 px-6 text-center" colSpan="3">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default Dashboard;
