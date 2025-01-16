import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default: Newest first
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orderLists`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order lists:", error);
        throw error;
      }
    };

    fetchOrders();
  }, [user.token]);

  // Sorting function
  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt) // Oldest first
      : new Date(b.createdAt) - new Date(a.createdAt); // Newest first
  });

  if (orders.length === 0) {
    return <div className="text-center text-gray-500 py-6">Loading orders...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Incoming Orders</h2>

      {/* Sorting Buttons */}
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${
            sortOrder === "asc" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setSortOrder("asc")}
        >
          Oldest First ↑
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            sortOrder === "desc" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setSortOrder("desc")}
        >
          Newest First ↓
        </button>
      </div>

      {sortedOrders.map((order, index) => (
        <div
          key={order._id.$oid || index}
          className="bg-white shadow-lg p-5 rounded-md mb-6 hover:shadow-xl transition duration-300"
        >
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4 font-semibold">${item.price * item.quantity}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

          {/* Buyer Information */}
          <div className="mt-5">
            <h3 className="font-semibold text-lg text-gray-700">Buyer Information</h3>
            <div className="bg-gray-100 p-4 rounded-lg mt-2">
              <p>
                <strong>Account Status:</strong> {order.buyerId}
              </p>
              <p>
                <strong>Name:</strong> {order.buyerName}
              </p>
              <p>
                <strong>Email:</strong> {order.buyerEmail}
              </p>
              <p>
                <strong>Phone:</strong> {order.buyerPhone}
              </p>
              <p>
                <strong>Shipping Address:</strong> {order.buyerAddress}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 text-sm rounded-full 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                >
                  {order.status || "Pending"}
                </span>
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-6 flex justify-between items-center bg-blue-100 p-4 rounded-lg">
            <span className="font-semibold text-lg">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-800">${order.totalAmount}</span>
          </div>

          {/* Order Date */}
          <div className="mt-4">
            <span className="font-semibold text-gray-600">Order Created Date:</span>
            <span className="ml-2 text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
