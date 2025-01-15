import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.userInfo); // Get token from Redux store

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orderLists`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Send token in headers
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order lists:", error);
        throw error; // Rethrow the error so it can be handled by the calling function
      }
    };

    fetchOrders();
  }, [user.token]);

  if (orders.length === 0) {
    return <div>Loading...</div>; // Show loading if no orders are available
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Incoming Order </h2>

      {orders.map((order, index) => (
        <div
          key={order._id.$oid || index}
          className="bg-white shadow-2xl p-3 rounded-md  mb-6"
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Product Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">${item.price}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Buyer Information</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
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
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold">${order.totalAmount}</span>
          </div>

          <div className="mt-4">
            <span className="font-semibold">Order Created Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
